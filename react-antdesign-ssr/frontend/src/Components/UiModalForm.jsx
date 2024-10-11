import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button, Alert, Spin } from "antd";
import ErrorBoundary from "~/Components/ErrorBoundary";


export default function UiModalForm({ 
    pk, api, baseUrl, navigate, fetchTableData, children, 
    componentDidMount = false, // boolean
    width = 520, // number
    transformInitialValues = null, // function
    transformFormData = null, // function
    shouldSubmit = null, // function
    submitBtnDisabled = false  // boolean
  }) {
  
  const [ form ] = Form.useForm(),

        [ loading, setLoading ] = useState( false ),
        [ errorMessage, setErrorMessage ] = useState( `` ),
        [ disabled, setDisabled ] = useState( false ),
        [ initialValuesLoaded, setInitialValuesLoaded ] = useState( false ),

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
          setErrorMessage( "" );
          if ( typeof shouldSubmit === "function" && !shouldSubmit({ setErrorMessage }) ) {
            return;
          }
          setLoading( true );
          
          try {
            transformFormData && transformFormData( values );
            
            if ( pk ) {
              await api.update( pk, values );
            } else {
              await api.add( values );
            }
            
            // on change route the table updates anyway
            setLoading( false );
            close();
          } catch ( err ) {
            console.error( "Form error", err );
            setErrorMessage(  err.message ?? "Internal error" );
            setLoading( false );
          }  
        };

  // componentDidMount
  useEffect(() => {
    
    async function fetchData() {
      try {     
        setLoading( true );
        const data = pkInt ? await api.get( pkInt ) : {};
        transformInitialValues && transformInitialValues( data );
        form.setFieldsValue( data );
      } catch ( err ) {
        setErrorMessage( `Internal error: ${ err.message }` );
      } finally {
        componentDidMount && componentDidMount();
        setLoading( false );
        setInitialValuesLoaded( true );
      }
    }

    fetchData();

  }, [ pk ]);

  return (<ErrorBoundary>
        <Modal
          title={ getWindowTitle() }
          open={ true }
          disabled={ disabled }
          closable
          onCancel={ onClickCancel }          
          width={ width }
          footer={[
            ( <Button
              autoFocus={ true }
              key="submit"
              type="primary"
              disabled={ submitBtnDisabled }
              onClick={ onClickOk }>
              Save
            </Button> ) ]}
        >
          <Spin spinning={ loading } size="large">
          <Form form={ form }
            layout="vertical"
            onFinish={ ( values ) => { 
              setLoading( false );
              submit( pkInt, values ); 
            }}
            onFinishFailed={ () => setDisabled( true )  }
          >
            { errorMessage ? <Alert
                 description={ errorMessage }
                 type="error"
               /> : null }

            { children({ form, onKeyDown, initialValuesLoaded }) }

           

          </Form>
          </Spin>

        </Modal>
      </ErrorBoundary>);
};


UiModalForm.propTypes = {
  pk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  api: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  fetchTableData: PropTypes.func,
  children: PropTypes.func.isRequired,
  width: PropTypes.number,
  transformInitialValues: PropTypes.func,
  transformFormData: PropTypes.func,
  shouldSubmit: PropTypes.func,
  submitBtnDisabled: PropTypes.bool
}; 