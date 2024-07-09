import React, { useState } from "react";
import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import styles from "./index.module.css";
import { courseAdd } from "@/api/course";
import { CourseType } from "@/type";
import { useRouter } from "next/router";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function CourseForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleFinish = async (values: CourseType) => {
    console.log(
      "%c[values]-21",
      "font-size:13px; background:pink; color:#000",
      values
    );
    await courseAdd(values);
    message.success("Create Sucessfully");
    router.push("/course/list");
  };
  const handleCancel = () => {
    router.push("/course/list");
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        color: "black",
        fontSize: "14px",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, color: "black" }}>Upload</div>
    </button>
  );

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
        <Form.Item label="Cover" name="cover" rules={[{ required: true }]}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Upload
              name="cover"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Space>
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
