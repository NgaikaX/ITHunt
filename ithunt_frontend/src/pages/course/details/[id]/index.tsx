import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {feedbackAdd, getCourseDetails, getFeedback, getFeedbackList} from "@/api";
import { CourseType, FeedbackType } from "@/type";
import { Button, Card, Image, List, Modal, message } from "antd";
import styles from "./index.module.css";
import TextArea from "antd/es/input/TextArea";
import {formatTimestamp} from "@/utils";

export default function CourseDetail() {
  const router = useRouter();
  const id  = router.query.id as string;
  const [course, setCourse] = useState<CourseType | null>(null);
  const { coursename } = router.query;
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState<string>('');
  const [userID, setUserID] = useState<number>(null);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          setUserName(userData.username || '');
          setUserID(userData.id||null);
      }
    if (id) {
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
            getCourseDetails(numericId).then((res) => {
                setCourse(res.data);
            });
            getFeedback(numericId).then((fb) => {
                setFeedbackList(fb.data);
            });
        } else {
            console.error('Invalid id:', id);
        }
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setShowModal(true);
  };
  const handleSubmit = async () =>{
      const uploadDate = formatTimestamp(Date.now());
      setConfirmLoading(true);
      const values: FeedbackType = {
          course_id: course.id,
          feedback,
          username: userName,
          user_id:userID,
          coursename:course.coursename,
          uploaddate:uploadDate,
      };
      console.log("values", values);
      await feedbackAdd(values);
      message.success(`You have submitted the feedback successfully!`);
      setShowModal(false);
      setConfirmLoading(false);
      setFeedback(""); // Clear feedback after submission
  };

  return (
    <div className={styles.outsideWrap}>
      <div className={styles.coverCon}>
        <Image src={course.cover} className={styles.cardWrap} />
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
        open={showModal}
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
        <TextArea rows={20} placeholder="Please enter your feedback here" value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
      </Modal>
    </div>
  );
}
