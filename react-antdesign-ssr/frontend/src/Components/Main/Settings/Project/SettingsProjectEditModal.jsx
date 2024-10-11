import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";
import UiModalForm from "~/Components/UiModalForm";
import { api } from "~/Api/Project";
/*eslint no-useless-escape: 0*/

const FormItem = Form.Item,
      Option = Select.Option;
      

export default function SettingsProjectEditModal({ pk, open, baseUrl, navigate, fetchTableData }) {

  return (<UiModalForm
            pk={ pk }
            api={ api }
            open={ open }
            baseUrl={ baseUrl }
            fetchTableData={ fetchTableData }
            navigate={ navigate } > 
           
     {({ onKeyDown }) => ( <>
      <FormItem  label="User name!"  name="name" rules={[{ required: true,
        message: "Field is required" }]}>
          <Input
            onKeyDown={ onKeyDown } />
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
      </>)}         

    </UiModalForm> );
};

SettingsProjectEditModal.propTypes = {
  pk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  baseUrl: PropTypes.string,
  navigate: PropTypes.func,
  fetchTableData: PropTypes.func
}; 