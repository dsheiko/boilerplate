import React, { useState, useRef, useEffect } from "react";
import { Form, Modal, Button, Input, Alert, Spin, Select } from "antd";
import ErrorBoundary from "~/Components/ErrorBoundary";
import { api } from "~/Api/Project";
/*eslint no-useless-escape: 0*/

const FormItem = Form.Item,
      Option = Select.Option;

export default function SettingsProjectEditModal({ pk, baseUrl, navigate, open, fetchTableData }) {
  
  const [ form ] = Form.useForm(),

        [ loading, setLoading ] = useState( false ),
        [ errorMessage, setErrorMessage ] = useState( `` ),
        [ entity, setEntity ] = useState( {} ),
        [ disabled, setDisabled ] = useState( false ),
        
        getWindowTitle = () => pk ? `Edit record` : `New record`,

        onClickOk = ( e ) => {
          e.preventDefault();    
          form.submit();
        },

        onKeyDown = ( e, cb ) => {
          switch ( e.key ){
            case "Enter":
              cb( e );
              return;
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
    if ( !pk ) {
      return;
    }
    
    async function fetchData() {
      try {
     
        setLoading( true );

        const rsp = await api.get( pk );
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
          open={ open }
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
              submit( pk, values ); 
            }}
            onFinishFailed={ () => setDisabled( true )  }
          >
            { errorMessage ? <Alert
                 message="Error"
                 description={ errorMessage }
                 type="error"
               /> : null }

            <FormItem  label="User name"  name="name" rules={[{ required: true,
        message: "Field is required" }]}>
                <Input
                  onKeyDown={ ( e ) => onKeyDown( e, onClickOk ) } />
            </FormItem>

            <FormItem  label="Environment" name="env" rules={[{
        required: true,
        message: "Field is required"
      }]}>
            <Select>
              <Option key="test">test</Option>
              <Option key="stage">stage</Option>
              <Option key="live">live</Option>
            </Select>
            </FormItem>

          </Form>
          </Spin>

        </Modal>
      </ErrorBoundary>);
};
