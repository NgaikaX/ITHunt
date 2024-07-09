import React, { useState } from "react";
import { Button, Form, Image, Input, Space, message } from "antd";
import { useRouter } from "next/router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.css";
import { vocabularyAdd } from "@/api/glossary";
import { VocabularyType } from "@/type/glossary";

export default function ArticalForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleFinish = async (values: VocabularyType) => {
    /*console.log(
      "%c[values]-21",
      "font-size:13px; background:pink; color:#000",
      values
    );*/
    await vocabularyAdd(values);
    message.success("Create Sucessfully");
    router.push("/glossary/list");
  };
  const handleCancel = () => {
    router.push("/glossary/list");
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Vocabulary"
          name="vocabulary"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter a term" />
        </Form.Item>
        <Form.Item
          label="Explanation"
          name="explanation"
          rules={[{ required: true }]}
        >
          <ReactQuill
            className={styles.publishquill}
            theme="snow"
            placeholder="Enter the content"
          />
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
