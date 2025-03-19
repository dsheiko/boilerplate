import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button, Alert, Spin, Input } from "antd";
import { api } from "~/Api/Login";
import ErrorBoundary from "~/Components/ErrorBoundary";


export default function LoginModal({ 
    width = 520
  }) {
  
  const [ form ] = Form.useForm(),

        [ loading, setLoading ] = useState( false ),
        [ errorMessage, setErrorMessage ] = useState( `` ),
        [ infoMessage, setInfoMessage ] = useState( `` ),
        [ disabled, setDisabled ] = useState( false ),
        
        onSubmit = ( e ) => {
          e.preventDefault();    
          form.submit();
        },

        onKeyDown = ( e ) => {
            if ( e.key === "Enter" ) {
                e.preventDefault();    
                form.submit();
            }
        },
        
        submit = async ( values ) => {
          setInfoMessage( "" );
          setErrorMessage( "" );
          setLoading( true );          
          try {
            await api.add( values );            
            // on change route the table updates anyway
            setLoading( false );
            setInfoMessage( "You have been successfully logged in" );
          } catch ( err ) {
            console.error( "Form error", err );
            
            setErrorMessage(  err.response?.data?.message ?? err.message ?? "Internal error" );
            setLoading( false );
          }  
        };

  return (<ErrorBoundary>
        <Modal
          title="Login"
          open={ true }
          disabled={ disabled }
          closable={ false }
          width={ width }
          footer={[
            ( <Button
              autoFocus={ true }
              key="submit"
              type="primary"
              disabled={ disabled }
              onClick={ onSubmit }>
              Login
            </Button> ) ]}
        >
          <Spin spinning={ loading } size="large">
          <Form form={ form }
            layout="vertical"
            onFinish={ ( values ) => { 
              setLoading( false );
              submit( values ); 
            }}
            onFinishFailed={ () => setDisabled( true )  }
          >
            <p>Mock credentials: john.doe@acme.com / Password1</p>
            { errorMessage ? <Alert
                description={ errorMessage } style={{ margin: "12px 0" }} type="error" /> : null }

            { infoMessage ? <Alert
                description={ infoMessage } style={{ margin: "12px 0" }} type="success" /> : null }
            
          <Form.Item label="Email" name="email" rules={[{ required: true,
            message: "Field is required" }]}>
              <Input placeholder="e.g. john.doe@acme.com"
                onKeyDown={ onKeyDown } />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true,
            message: "Field is required" }]}>
              <Input.Password placeholder="e.g. Password"
                onKeyDown={ onKeyDown } />
          </Form.Item>


          </Form>
          </Spin>

        </Modal>
      </ErrorBoundary>);
};


LoginModal.propTypes = {
  width: PropTypes.number
}; 