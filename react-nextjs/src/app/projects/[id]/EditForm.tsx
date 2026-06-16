"use client"
import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Alert, Spin } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, add, update } from "@/utils/api";
import { PAGE_PROJECTS } from "@/utils/constants";

type FieldType = {
  name?: string;
  env?: string;
};

const EditForm = ( { projectId, onClose }: { projectId: number | undefined; onClose: () => void } ) => {
  const queryClient = useQueryClient(),
        [ form ] = Form.useForm(),

        mutation = useMutation( {
          mutationFn: async ( values: FieldType ) => {
            if ( projectId ) {
              await update( PAGE_PROJECTS, projectId, values );
            } else {
              await add( PAGE_PROJECTS, values );
            }
          },
          onSuccess: async () => {
            await queryClient.invalidateQueries( { queryKey: [ PAGE_PROJECTS ] } );
            onClose();
          },
        } );

  const { data, isLoading, error } = useQuery( {
    queryKey: [ PAGE_PROJECTS, projectId ],
    queryFn:  () => get( PAGE_PROJECTS, projectId as number ),
    enabled:  !!projectId,
  } );

  useEffect( () => {
    if ( data ) {
      form.setFieldsValue( data );
    }
  }, [ data, form ] );

  const onFinish: FormProps<FieldType>[ "onFinish" ] = ( values ) => {
    mutation.mutate( values );
  };

  const onKeyDown = ( e: React.KeyboardEvent<HTMLElement> ) => {
    if ( e.key === "Enter" ) {
      e.preventDefault();
      form.submit();
    }
  };

  return (
    <>
      { mutation.isError ? <Alert message="Error" description={ mutation.error.message } type="error" /> : null }
      { error ? <Alert message="Error" description={ error.message } type="error" /> : null }
      <Spin tip="Loading..." spinning={ isLoading || mutation.isPending }>
        <Form
          form={ form }
          name="basic"
          labelCol={ { span: 8 } }
          wrapperCol={ { span: 16 } }
          style={ { maxWidth: 600 } }
          onFinish={ onFinish }
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="User name"
            name="name"
            rules={ [{ required: true, message: "Field is required" }] }
          >
            <Input onKeyDown={ onKeyDown } />
          </Form.Item>

          <Form.Item<FieldType>
            label="Environment"
            name="env"
            rules={ [{ required: true, message: "Field is required" }] }
          >
            <Select>
              <Select.Option key="test">test</Select.Option>
              <Select.Option key="stage">stage</Select.Option>
              <Select.Option key="live">live</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label={ null }>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default EditForm;
