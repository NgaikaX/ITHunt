import React, { useState } from "react";
import { Button, Form, Image, Input, Space } from "antd";
import styles from "./index.module.css";
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const handleFinish = (values) => {
  courseAdd(values);
};

export default function CourseForm() {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState("");
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Course Name"
          name="coursename"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter a course name" />
        </Form.Item>
        <Form.Item
          label="Lecturer"
          name="lecturer"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter the lecturer" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea rows={15} placeholder="Enter the description" />
        </Form.Item>
        <Form.Item label="Cover" name="cover">
          <Input.Group compact>
            <Input
              placeholder="Enter the url"
              style={{ width: "calc(100% - 90px)" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}
            >
              Preview
            </Button>
          </Input.Group>
          {preview && (
            <Form.Item label="" colon={false} className={styles.preview}>
              <Image src={preview} width={100} height={100} alr="" />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item label="" colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              Finish
            </Button>
            <Button>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
