import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";
import UiModalForm from "~/Components/UiModalForm";
import { api } from "~/Api/Project";
import { useParams, useNavigate, useLocation } from "react-router-dom";
/*eslint no-useless-escape: 0*/

const FormItem = Form.Item,
      Option = Select.Option;
      

export default function SettingsProjectEditModal() {

  const { pk } = useParams(),
          navigate = useNavigate(),
          location = useLocation();

  return (<UiModalForm
            pk={ pk }
            api={ api }
            baseUrl={ location.pathname.split( "/" ).slice( 0, -1 ).join( "/" ) }
            navigate={ navigate } > 
           
     {({ onKeyDown }) => ( <>
      <FormItem  label="Project"  name="name" rules={[{ required: true,
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