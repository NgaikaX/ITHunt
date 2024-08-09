import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Upload,
  Image,
  message,
} from "antd";
import {Sl_CourseType, VocabularyType} from "@/type";
import { useRouter } from "next/router";
import {
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { slCourseAdd, slCourseCoverUpload, slCourseUpdate, slCourseVideoUpload} from "@/api";
import styles from "./index.module.css";
import {formatTimestamp} from "@/utils";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const beforeUploadImg = (file) => {
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

const beforeUploadVideo = (file) => {
  const isMp4 = file.type === "video/mp4";
  if (!isMp4) {
    message.error("You can only upload MP4 file!");
  }
  return isMp4;
};

export default function CourseForm({editData={},}:{editData?:Partial<Sl_CourseType>}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      if (editData.cover) {
        setImageUrl(editData.cover); // Assuming editData.cover is base64 or URL of the image
      }
      if (editData.description) {
        setDescription(editData.description); // 设置编辑时的描述内容
      }
    }
    console.log("Edit data set in form:", editData);
  }, [editData, form]);

  const handleFinish = async (values: Sl_CourseType) => {
    values.uploaddate = formatTimestamp(Date.now());  // Set current date and time
    values.description = description;
    setLoading(true);
    let coverUrl: string;
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("cover", fileList[0]);
      const uploadData = await slCourseCoverUpload(formData as FormData);
      coverUrl = uploadData.data;
    }
    values.cover = coverUrl;

    if (editData.id) {
      await slCourseUpdate({ ...editData, ...values });
    } else {
      await slCourseAdd(values);
    }
    message.success("Create Sucessfully");
    router.push("/selflearning/courselist");
    setLoading(false);
  };


  const handleCancel = () => {
    router.push("/selflearning/courselist");
  };

  const handleImgChange = (info: any) => {
    console.log(info);
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
    <button className={styles.uploadbtn} type="button">
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
        initialValues={editData}
        className={styles.formWrap}
      >
        <Form.Item
          label="Course Name"
          name="coursename"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter a course name" />
        </Form.Item>
        <Form.Item label="Video" name="videourl">
          <Input placeholder="Enter a YouTube/mp4 video url"></Input>
        </Form.Item>
        <Form.Item label="Cover" name="cover" rules={[{ required: true }]}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Upload
              name="cover"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUploadImg}
              onChange={handleImgChange}
            >
              {imageUrl ? (
                <Image src={imageUrl} alt="cover" className={styles.cover} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
        >
          <ReactQuill  className={styles.publishquill}
                       theme="snow"
                       placeholder="Enter the description"
                       value={description}
                       onChange={setDescription}/>
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
