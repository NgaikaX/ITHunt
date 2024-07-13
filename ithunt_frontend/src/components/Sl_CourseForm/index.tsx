import React, { useEffect, useState } from "react";
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
import { Sl_CourseType } from "@/type";
import { useRouter } from "next/router";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { slCourseAdd, slCourseUpdate } from "@/api";
import styles from "./index.module.css";

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUploadImg = (file: FileType) => {
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

const beforeUploadVideo = (file: FileType) => {
  const isMp4 = file.type === "video/mp4";
  if (!isMp4) {
    message.error("You can only upload JPG/PNG file!");
  }
  return isMp4;
};

export default function CourseForm({
  editData = {
    coursename: "",
  },
}: {
  editData?: Partial<Sl_CourseType>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();

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
    console.log(
      "%c[values]-21",
      "font-size:13px; background:pink; color:#000",
      values
    );
    if (editData.id) {
      await slCourseUpdate(values);
    } else {
      await slCourseAdd(values);
    }
    message.success("Create Sucessfully");
    router.push("/selflearning/courselist");
  };
  const handleCancel = () => {
    router.push("/selflearning/courselist");
  };

  const handleImgChange: UploadProps["onChange"] = (info) => {
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

  const handleVideoChange: UploadProps["onChange"] = (info) => {
    console.log(info);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const videoFile = info.file.originFileObj as FileType;
      const videoURL = URL.createObjectURL(videoFile);
      setLoading(false);
      setVideoUrl(videoURL);
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
