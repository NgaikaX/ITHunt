import {Button, Form, Input, Radio, Space, message, RadioChangeEvent} from "antd";

import { UserType } from "@/type";
import { useRouter } from "next/router";
import { userAdd, userUpdate } from "@/api";
import { USER_ROLE, USER_STATUS } from "@/constants";
import {useEffect, useState} from "react";
import {formatTimestamp} from "@/utils";

export default function UserForm({
  editData = {
    status: USER_STATUS.ON,
    role: USER_ROLE.STU,
  },
}: {
  editData?: Partial<UserType>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [role, setRole] = useState(editData.role || "student");
  const [status, setStatus] = useState(editData.status || "on");

  const handleStatusChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('status checked', value);
    setStatus(value);
  };

  const handleRoleChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('role checked', value);
    setRole(value);
  };


  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      console.log("editData",editData);
    }
    //console.log("Edit data set in form:", editData);
  }, [editData, form]);

  const handleFinish = async (values: UserType) => {
    // Add the current date and time to values
    values.uploaddate = formatTimestamp(Date.now());  // Set current date and time
    if (editData?.id) {
      console.log("before",values);
      await userUpdate({ ...editData, ...values });// Merge editData with form values
    } else {
      await userAdd(values);
    }
    message.success("Create Sucessfully");
    router.push("/users");
  };
  const handleCancel = () => {
    router.push("/users");
  };


  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        layout="horizontal"
        initialValues={editData}
        onFinish={handleFinish}
      >
        <Form.Item label="User Name" name="username">
          <Input placeholder="Enter a user name" />
        </Form.Item>
        <Form.Item label="E-mail" name="email" rules={[{ required: true }]}>
          <Input placeholder="Enter the e-mail address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Enter the password" />
        </Form.Item>
        <Form.Item
          label="Account Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Radio.Group onChange={handleStatusChange} value={status}>
            <Radio value="on">ON</Radio>
            <Radio value="off">OFF</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="User Role" name="role" rules={[{ required: true }]}>
          <Radio.Group onChange={handleRoleChange} value={role}>
            <Radio value="student">Student</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              Finish
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
