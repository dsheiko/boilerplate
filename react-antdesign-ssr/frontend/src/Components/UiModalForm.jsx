import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button, Alert, Spin } from "antd";
import ErrorBoundary from "~/Components/ErrorBoundary";


export default function UiModalForm({ pk, api, baseUrl, navigate, fetchTableData, children }) {
  
  const [ form ] = Form.useForm(),

        [ loading, setLoading ] = useState( false ),
        [ errorMessage, setErrorMessage ] = useState( `` ),
        [ disabled, setDisabled ] = useState( false ),

        pkInt = pk ? parseInt( pk, 10 ) : 0,
        
        getWindowTitle = () => pkInt ? `Edit record` : `New record`,

        onClickOk = ( e ) => {
          e.preventDefault();    
          form.submit();
        },

        onKeyDown = ( e ) => {
            if ( e.key === "Enter" ) {
                e.preventDefault();    
                form.submit();
            }
        },

        onClickCancel = ( e ) => {
          e.preventDefault();
          close();
        },

        close = () => {
          navigate( baseUrl );
        },
        
        submit = async ( pk, values ) => {
          const data = values;
          setErrorMessage( "" );
          setLoading( true );
          
          try {
            if ( pk ) {
              await api.update( pk, data );
            } else {
              await api.add( data );
            }
            
            fetchTableData();
            setLoading( false );
            close();
          } catch ( err ) {
            console.log( "Error", err );
            setErrorMessage(  `Internal server error: ${ err.message }` );
            setLoading( false );
          }  
        };

  // componentDidMount
  useEffect(() => {
    if ( !pkInt ) {
      return;
    }
    
    async function fetchData() {
      try {
     
        setLoading( true );

        const rsp = await api.get( pkInt );
        if ( rsp.status !== 200 ) {
          throw new Error( `Server status code ${ rsp.status }` );
        }
        form.setFieldsValue( rsp.data );
      } catch ( err ) {
        setErrorMessage( `Internal error: ${ err.message }` );
      } finally {
        setLoading( false );
      }
    }

    fetchData();


  }, [ pk ]);

  return (<ErrorBoundary>
        <Modal
          title={ getWindowTitle() }
          open={ !!pkInt }
          disabled={ disabled }
          closable
          onCancel={ onClickCancel }
          footer={[
            ( <Button
              autoFocus={ true }
              key="submit"
              type="primary"
              onClick={ onClickOk }>
              Save
            </Button> ) ]}
        >
          <Spin spinning={ loading } size="large">
          <Form form={ form }
            onFinish={ ( values ) => { 
              setLoading( false );
              submit( pkInt, values ); 
            }}
            onFinishFailed={ () => setDisabled( true )  }
          >
            { errorMessage ? <Alert
                 message="Error"
                 description={ errorMessage }
                 type="error"
               /> : null }

            { children({ form, onKeyDown }) }

           

          </Form>
          </Spin>

        </Modal>
      </ErrorBoundary>);
};


UiModalForm.propTypes = {
  pk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  api: PropTypes.object,
  baseUrl: PropTypes.string,
  navigate: PropTypes.func,
  fetchTableData: PropTypes.func,
  children: PropTypes.func,
}; 