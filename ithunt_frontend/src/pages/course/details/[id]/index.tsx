import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCourseDetails, getFeedback, getFeedbackList } from "@/api";
import { CourseType, FeedbackType } from "@/type";
import { Button, Card, Input, List, Modal, message } from "antd";
import styles from "./index.module.css";
import TextArea from "antd/es/input/TextArea";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType | null>(null);
  const { coursename } = router.query;
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getCourseDetails(id as number).then((res) => {
        setCourse(res.data);
      });
      getFeedback(id as string).then((fb) => {
        setFeedbackList(fb.data);
      });
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    message.success(`You have submit the feedback successfully!`);
    setShowModal(false);
    setConfirmLoading(false);
    //TODO:add a submit api later
  };

  return (
    <div className={styles.outsideWrap}>
      <div className={styles.coverCon}>
        <img src={course.cover} className={styles.cardWrap} />
      </div>

      <Card className={styles.descriptionCard}>
        <h1>{course.coursename}</h1>
        <br />
        <p>{course.description}</p>
      </Card>

      <Card>
        <h1>{course.coursename} Feedback</h1>
        <br />
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
            marginBottom: "10px",
          }}
        >
          <List
            dataSource={feedbackList}
            renderItem={(item) => (
              <List.Item key={item.username}>
                <List.Item.Meta
                  title={item.username}
                  description={item.feedback}
                />
              </List.Item>
            )}
          />
        </div>
        <Button type="primary" onClick={handleClick}>
          Add my Feedback
        </Button>
      </Card>
      <Modal
        title="Feedback"
        visible={showModal}
        confirmLoading={confirmLoading}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="customButton" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
          <Button key="cancelButton" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <TextArea rows={20} placeholder="Please enter your feedback here" />
      </Modal>
    </div>
  );
}
