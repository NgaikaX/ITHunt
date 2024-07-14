import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSlCourseDetails } from "@/api"; // 假设你有一个 API 调用来获取课程详情
import { CourseType, Sl_CourseType } from "@/type";
import { Button, Card, Col, Row } from "antd";
import styles from "./index.module.css";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Sl_CourseType | null>(null);

  useEffect(() => {
    if (id) {
      getSlCourseDetails(id as string).then((res) => {
        setCourse(res.data);
      });
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={24} className={styles.outsideWrap}>
      <Col span={18}>
        <video src={course.videourl} controls className={styles.cardWrap} />
        <Card className={styles.cardWrap}>
          <h1>{course.coursename}</h1>
          <br />
          <p>{course.description}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Button type="primary">Quiz</Button>
      </Col>
    </Row>
  );
}
