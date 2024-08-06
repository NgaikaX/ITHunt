import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import {getSlCourseDetails, getUserCourseComplete, getUserQuizByCourse, updateCourseComplete} from "@/api";
import { Sl_CourseType } from "@/type";
import { Button, Card, Col, Row, Space } from "antd";
import styles from "./index.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function Sl_CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Sl_CourseType | null>(null);
  const[user_id, setUserID] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean | null>(null);
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUserID(userData.id || null);
  }, []);

  useEffect(() => {
    if (id) {
      getSlCourseDetails(id as number).then((res) => {
        const videoUrl = res.data.videourl;
        setCourse(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && user_id !== null) {
      getUserQuizByCourse(user_id,id as number).then((res) => {
        if(res.data){
          setQuizCompleted(res.data.complete);
        }
      });
      getUserCourseComplete(user_id,id as number).then((res) => {
        if(res.data){
          console.log("usercourse",res)
          setCourseCompleted(res.data.complete);
        }
      })
    }
  }, [id, user_id]);

  const handleCompleteCourse = async () => {
    if (id && user_id !== null) {
      const values = {
        courseId: id as number,
        userId: user_id as number,
      };
      await updateCourseComplete(values);
      setCourseCompleted(true);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    if (quizCompleted) {
      router.push(`/selflearning/quizresult/${id}`);
    } else {
      router.push(`/selflearning/quiz/${id}`);
    }
  };

  const renderVideo = (url: string) => {
    console.log("Video URL:", url);
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      return (
          <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className={styles.cardWrap}
              width="640"
              height="360"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
          />
      );
    } else if (url.endsWith(".mp4")) {
      return (
          <video
              src={url}
              className={styles.cardWrap}
              width="640"
              height="360"
              controls
          />
      );
    } else {
      return <div>Unsupported video format</div>;
    }
  };

  return (
    <Row gutter={24} className={styles.outsideWrap}>
      <Col span={17}>
        {course.videourl ? renderVideo(course.videourl) : null}
        <Card className={styles.cardWrap}>
          <h1>{course.coursename}</h1>
          <br />
          <ReactQuill
          value={course.description}
          readOnly={true}
          theme="bubble"
          />
        </Card>
      </Col>
      <Col span={7}>
        <Card className={styles.quizentrance}>
          <h1>Have you finished the course? </h1>
          <br />
          <Space>
            <h3>{quizCompleted ? "Review the quiz" : "Take the quiz now!"}</h3>
            <Button
              shape="round"
              icon={<ArrowRightOutlined />}
              size="small"
              onClick={handleClick}
            ></Button>
          </Space>
        </Card>
        <Button
            onClick={handleCompleteCourse}
            disabled={courseCompleted}
            type="primary"
            className={styles.finishBtn}
        >
          {courseCompleted ? "Course Completed" : "Finish the Course"}
        </Button>
      </Col>
    </Row>
  );
}
