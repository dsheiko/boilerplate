import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";

type FieldType = {
  name?: string;
  env?: string
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const EditForm = ({ projectId }: { projectId: number | undefined }) => {


    const [ form ] = Form.useForm(),

            onKeyDown = ( e: React.KeyboardEvent<HTMLElement> ) => {
                if ( e.key === "Enter" ) {
                    e.preventDefault();    
                    form.submit();
                }
            };

    return (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >       
        <Form.Item<FieldType>
            label="User name" 
            name="name" 
            rules={[{ required: true, message: "Field is required" }]}>
            <Input
                onKeyDown={ onKeyDown } />
        </Form.Item>

        <Form.Item<FieldType>  
            label="Environment" 
            name="env" 
            rules={[{ required: true, message: "Field is required" }]}>
            <Select>
                <Select.Option key="test">test</Select.Option>
                <Select.Option key="stage">stage</Select.Option>
                <Select.Option key="live">live</Select.Option>
            </Select>
        </Form.Item> 

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>

    </Form>
    );
}

export default EditForm;


