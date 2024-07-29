import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  GetProp,
  Input,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import {Sl_CourseType, VocabularyType} from "@/type";
import { useRouter } from "next/router";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {coverUpload, slCourseAdd, slCourseCoverUpload, slCourseUpdate, slCourseVideoUpload} from "@/api";
import styles from "./index.module.css";
import {formatTimestamp} from "@/utils";

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
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
    message.error("You can only upload JPG/PNG file!");
  }
  return isMp4;
};

export default function CourseForm({editData={},}:{editData?:Partial<Sl_CourseType>}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [videoList, setVideoList] = useState<File[]>([]);
  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      if (editData.cover) {
        setImageUrl(editData.cover); // Assuming editData.cover is base64 or URL of the image
      }
      if (editData.videourl) {
        setVideoUrl(editData.videourl); // Assuming editData.video is URL of the video
      }
    }
    console.log("Edit data set in form:", editData);
  }, [editData, form]);

  const handleFinish = async (values: Sl_CourseType) => {
    values.uploaddate = formatTimestamp(Date.now());  // Set current date and time
    setLoading(true);
    let coverUrl: string;
    let videoUrl: string;
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("cover", fileList[0]);
      const uploadData = await slCourseCoverUpload(formData as FormData);
      //console.log("uploadData", uploadData); // 打印上传响应数据
      coverUrl = uploadData.data; // 根据返回的数据结构获取URL
    }
    if (videoList.length > 0){
      formData.append("video", videoList[0]);
      const uploadVideo = await slCourseVideoUpload(formData as FormData);
      videoUrl = uploadVideo.data;
    }
    values.cover = coverUrl;
    values.videourl=videoUrl;

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

  const handleVideoChange = (info: any) => {
    console.log(info);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setVideoList([info.file.originFileObj]);
      const reader = new FileReader();
      reader.onload = () => setVideoUrl(reader.result as string);
      reader.readAsDataURL(info.file.originFileObj);
      setLoading(false);
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
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea rows={8} placeholder="Enter the description" />
        </Form.Item>
        <Form.Item label="Video" name="video">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                style={{ width: "100%", height: "auto" }}
              />
            ) : null}
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUploadVideo}
              onChange={handleVideoChange}
            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Space>
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
