import React from "react";
import PropTypes from "prop-types";
import AbstractEditModal from "Components/AbstractEditModal";
import { Form, Modal, Button, Input, Alert, Spin, Select } from "antd";
import ErrorBoundary from "Components/ErrorBoundary";
import { api } from "Api/Project";
import If from "Components/If";

/*eslint no-useless-escape: 0*/

const FormItem = Form.Item,
      Option = Select.Option;

export default class SettingsProjectEditModal extends AbstractEditModal {

  static displayName = "SettingsProjectEditModal";

  static propTypes = {
    history: PropTypes.object.isRequired,
    pk: PropTypes.number
  }

  constructor( props ) {
    super( props );
    this.api = api;
    this.state.entity = {
      name: "",
      env: ""
    };
  }

  

  render() {
    const { errorMessage, loading, entity, disabled } = this.state;

    return (
      <ErrorBoundary>
        <Modal
          title={ this.getWindowTitle() }
          visible={ true }
          disabled={ disabled }
          closable
          onCancel={ this.onClickCancel }
          footer={[
            ( <Button
              autoFocus={ true }

              key="submit"
              type="primary"
              onClick={this.onClickOk}>
              Save
            </Button> ) ]}
        >
          <Spin spinning={ loading } size="large">
          <Form ref={this.formRef} 
            initialValues={{
              name: entity.name,
              env: entity.env
            }}
            onFinish={ ( values ) => { 
              this.setState({ disabled: false });
              this.submit( this.props.pk, values ); 
            }}
            onFinishFailed={ ({ errorFields }) => this.setState({ disabled: true })  }
          >
            <If exp={ errorMessage }>
              <Alert
                 message="Error"
                 description={ errorMessage }
                 type="error"
               />
            </If>

            <FormItem  label="User name"  name="name" rules={[{ required: true,
        message: "Field is required" }]}>
                <Input
                  onKeyPress={ ( e ) => this.onKeyPress( e, this.onClickOk ) } />
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
      </ErrorBoundary>
    );
  }
};

