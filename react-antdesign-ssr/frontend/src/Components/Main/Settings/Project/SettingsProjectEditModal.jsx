import React from "react";
import PropTypes from "prop-types";
import AbstractEditModal from "~/Components/AbstractEditModal";
import { Form, Modal, Button, Input, Alert, Spin, Select } from "antd";
import ErrorBoundary from "~/Components/ErrorBoundary";
import { api } from "~/Api/Project";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "~/Actions";

// Mapping state to the props
const mapStateToProps = ( state ) => ({}),
      // Mapping actions to the props
      mapDispatchToProps = ( dispatch ) => ({
        actions: bindActionCreators( actions, dispatch )
      });

/*eslint no-useless-escape: 0*/

const FormItem = Form.Item,
      Option = Select.Option;

// Using store connect as a decorator
@connect( mapStateToProps, mapDispatchToProps )
export default class SettingsProjectEditModal extends AbstractEditModal {

  static displayName = "SettingsProjectEditModal";

  static propTypes = {
    navigate: PropTypes.func,
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

  close() {
   this.props.navigate( this.url );
  }

  render() {
    const { errorMessage, loading, entity, disabled } = this.state;

    return (
      <ErrorBoundary>
        <Modal
          title={ this.getWindowTitle() }
          open={ true }
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
            { errorMessage ? <Alert
                 message="Error"
                 description={ errorMessage }
                 type="error"
               /> : null }

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

