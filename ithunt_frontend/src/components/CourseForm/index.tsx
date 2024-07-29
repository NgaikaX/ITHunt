import React, {useEffect, useState} from "react";
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
import {courseAdd, courseUpdate, coverUpload} from "@/api/course";
import {CourseType, UserType} from "@/type";
import { useRouter } from "next/router";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {formatTimestamp} from "@/utils";

const { TextArea } = Input;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (img, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  console.log(file)
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

export default function CourseForm( {editData={},}:{editData?:Partial<CourseType>}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      if (editData.cover) {
        setImageUrl(editData.cover); // Assuming editData.cover is base64 or URL of the image
      }
      console.log("editData",editData);
    }
    //console.log("Edit data set in form:", editData);
  }, [editData, form]);

  const handleFinish = async (values: CourseType) => {
    values.uploaddate = formatTimestamp(Date.now());  // Set current date and time
    setLoading(true);
      let coverUrl: string;
      let uploadDate: string;
      if (fileList.length > 0) {
        const file = fileList[0];
        const formData = new FormData();
        formData.append("cover", fileList[0]);
        const uploadData = await coverUpload(formData as FormData);
        console.log("uploadData", uploadData); // 打印上传响应数据
        coverUrl = uploadData.data; // 根据返回的数据结构获取URL
      }
      values.cover = coverUrl;

    if (editData?.id){
      await courseUpdate({ ...editData, ...values });
    }else{
      await courseAdd(values);
    }
      message.success("Course created successfully");
      router.push("/course/list");
      setLoading(false);
  };

  const handleCancel = () => {
    router.push("/course/list");
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setFileList([info.file.originFileObj]);
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(info.file.originFileObj);
      setLoading(false);
    }
    if (info.file.status === "error") {
      setLoading(false);
      message.error("Upload failed.");
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
        className={styles.formWrap}
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
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="cover" className={styles.cover} />

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
