import { Button, Form, Input, Radio, Space, message } from "antd";

import { UserType } from "@/type";
import { useRouter } from "next/router";
import { userAdd, userUpdate } from "@/api";
import { USER_ROLE, USER_STATUS } from "@/constants";
import { useEffect } from "react";

export default function QuestionForm({
  editData = {
    status: USER_STATUS.ON,
    role: USER_ROLE.STU,
  },
}: {
  editData?: Partial<UserType>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();

  //console.log("Initial values passed to the component:", editData);

  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
    }
    //console.log("Edit data set in form:", editData);
  }, [editData, form]);

  const handleFinish = async (values: UserType) => {
    if (editData?.id) {
      await userUpdate(values);
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
          <Radio.Group>
            <Radio value="on">ON</Radio>
            <Radio value="off">OFF</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="User Role" name="role" rules={[{ required: true }]}>
          <Radio.Group>
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
