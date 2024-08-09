import React, {useEffect} from "react";
import { Button, Form,  Input, Space, message } from "antd";
import { useRouter } from "next/router";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.css";
import {glossaryUpdate, vocabularyAdd} from "@/api/glossary";
import { VocabularyType } from "@/type/glossary";
import {formatTimestamp} from "@/utils";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


// 定义组件属性类型
interface GlossaryFormProps {
  editData?: Partial<VocabularyType>;
}

export default function GlossaryForm({ editData = {} }: GlossaryFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();


  const handleFinish = async (values: VocabularyType) => {
    values.uploaddate = formatTimestamp(Date.now());
    if (editData.id) {
      await glossaryUpdate({ ...editData, ...values });
    } else {
      await vocabularyAdd(values);
    }
    message.success("Create Sucessfully");
    router.push("/glossary/list");
  };
  const handleCancel = () => {
    router.push("/glossary/list");
  };
  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      console.log("editData",editData);
    }
  }, [editData, form]);

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
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
