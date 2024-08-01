import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./index.module.css";
import { SetStateAction, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  message,
} from "antd";
import { INTEREST, LANGUAGE } from "@/constants";
import { UserCourseType, UserInfoType, UserQuizType } from "@/type";
import {
  getCourseCompletion, getQuizCompletion,
  getUserCourseList,
  getUserInfoList,
  getUserQuizList,
  userInfoAdd,
} from "@/api";
import { SelectCommonPlacement } from "antd/es/_util/motion";
import { useRouter } from "next/router";

export default function Dashboard() {
  const Option = Select.Option;
  const router = useRouter();
  const [coursePercent, setCoursePercent] = useState<number>(null);
  const [quizPercent, setQuizPercent] = useState<number>(null);

  //course progress
  const getCourseMessage = (percent: number) => {
    if (percent < 25) {
      return "Every step counts. Keep pushing forward!";
    } else if (percent < 50) {
      return "Great progress! Keep it up, you're on track!";
    } else if (percent < 75) {
      return "Getting closer to success. Keep going strong!";
    } else if (percent < 100) {
      return "Almost there. Finish strong!";
    } else {
      return "Congratulations on completing the course!";
    }
  };
  const getQuizMessage = (percent: number) => {
    if (percent < 25) {
      return "Every step counts. Keep pushing forward!";
    } else if (percent < 50) {
      return "Great progress! Keep it up, you're on track!";
    } else if (percent < 75) {
      return "Getting closer to success. Keep going strong!";
    } else if (percent < 100) {
      return "Almost there. Finish strong!";
    } else {
      return "Congratulations on completing the Quiz!";
    }
  };
  const coursemessage = getCourseMessage(coursePercent);
  const quizmessage = getQuizMessage(quizPercent);

  //user information form
  const languageOptions = [
    { value: LANGUAGE.EN, label: "English" },
    { value: LANGUAGE.SP, label: "Spanish" },
    { value: LANGUAGE.MA, label: "Mandarin" },
    { value: LANGUAGE.FR, label: "French" },
    { value: LANGUAGE.AR, label: "Arabic" },
    { value: LANGUAGE.NON, label: "None of them" },
  ];
  const interestOptions = [
    { value: INTEREST.RE, label: "Reading" },
    { value: INTEREST.MO, label: "Movies" },
    { value: INTEREST.MU, label: "Music" },
    { value: INTEREST.TR, label: "Traveling" },
    { value: INTEREST.SP, label: "Sport" },
    { value: INTEREST.NON, label: "None of them" },
  ];
  const [interest, setInterest] = useState<string>("");
  const [formLocked, setFormLocked] = useState(false);

  //course Table card and study partners card
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<UserInfoType[]>([]);
  const [course, setCourse] = useState<UserCourseType[]>([]);
  const [quiz, setQuiz] = useState<UserQuizType[]>([]);
  const [view, setView] = useState("course");
  const[user_id, setUserID] = useState(null);

  //Modal
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFinish = async (values: UserInfoType) => {
    //const interests = [interests1, interests2];
    const updatedValues = { ...values};
    await userInfoAdd(updatedValues);
    message.success("Information Added Successfully");
    await getUserInfoList(updatedValues);
    message.success("search for study partners");
    console.log("information", updatedValues);
    setFormLocked(true); //lock the form
  };
  const handleEdit = () => {
    setFormLocked(false); //unlock the form
  };

  async function fetchData(value?: any) {
    //get user's course list
    try {
      if (user_id) {
        //get coursePercent
        const cPercent = await getCourseCompletion(user_id);
        setCoursePercent(cPercent.data);
        //get user course list
        const courseres = await getUserCourseList(user_id);
        const course = courseres.data;
        setCourse(course || []);

        //get quizPercent
        const qPercent = await getQuizCompletion(user_id);
        setQuizPercent(qPercent.data);
        //get user's quiz list
        const quizres = await getUserQuizList(user_id);
        const quiz = quizres.data;
        setQuiz(quiz || []);
      }
      const res = await getUserInfoList({
        ...value,
      });

      //get study partner list
      const { data } = res; // Correctly access data here
      console.log("fetchData", data);
      setList(data || []); // Ensure list is an array
      setInitLoading(false); // set loading to false after data is fetched
    } catch (error) {
      console.error("Failed to fetch user info list:", error);
      setInitLoading(false); // set loading to false even if there's an error
    }
  }

  useEffect(() => {
    // Get user info from local storage
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUserID(userData.id || null);
    }
  }, []);

  useEffect(() => {
    if (user_id !== null) {
      fetchData(user_id);
    }
  }, [user_id]);

  const handleViewChange = (e: any) => {
    setView(e.target.value); // update views
    console.log("views", e.target.value);
  };

  const renderCourseList = () => (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={course}
      renderItem={(item) => {
        let completeString = "";
        {
          item.complete === true
            ? (completeString = "completed")
            : (completeString = "uncompleted");
        }
        const description = `${completeString}`;
        let btn = "";
        {
          item.complete === 1 ? (btn = "Review") : (btn = "Learn");
        }
        return (
          <List.Item
            actions={[
              <Button
                className={styles.coursebtn}
                key="sayhello"
                type="primary"
                onClick={() =>
                  //message.info(btn)
                  router.push(`/selflearning/coursedetails/${item.courseId}`)
                }
              >
                {btn}
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta
                title={item.coursename}
                description={description}
              />
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );

  const renderQuizList = () => (
    <List
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={quiz}
      renderItem={(item) => {
        let completeString = "";
        {
          item.complete === true
            ? (completeString = "completed")
            : (completeString = "uncompleted");
        }
        const description = `${completeString} | Score: ${item.score} | ${item.submitTime}`;
        let btn = "";
        {
          item.complete === true ? (btn = "Review") : (btn = "Attend");
        }
        return (
          <List.Item
            actions={[
              <Button
                className={styles.coursebtn}
                key="sayhello"
                type="primary"
                onClick={() =>
                  //message.info(btn)
                  router.push(`/selflearning/quiz/resultpage}`)
                }
              >
                {btn}
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta
                title={item.coursename}
                description={description}
              />
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );

  return (
    <>
      <Row gutter={24}>
        <Col span={16}>
          {/*learning progress */}
          <div className={styles.cardLayout}>
            <Card className={styles.cardtype}>
              <Progress
                type="dashboard"
                steps={4}
                percent={coursePercent}
                trailColor="rgba(0, 0, 0, 0.06)"
                strokeWidth={20}
                size={150}
                strokeColor="Lightskyblue"
              />
              <h2>Course Progress</h2>
              <p className={styles.description}>{coursemessage}</p>
            </Card>
            <Card className={styles.cardtype}>
              <Progress
                type="dashboard"
                steps={4}
                percent={quizPercent}
                trailColor="rgba(0, 0, 0, 0.06)"
                strokeWidth={20}
                size={150}
                strokeColor="mediumslateblue"
              />
              <h2>Quiz Progress</h2>
              <p className={styles.description}>{quizmessage}</p>
            </Card>
          </div>
          {/*Course and Quiz Management part */}
          <div className={styles.courseTable}>
            <Card className={styles.tableCard}>
              <Radio.Group value={view} onChange={handleViewChange}>
                <Radio.Button value="course">Course</Radio.Button>
                <Radio.Button value="quiz">Quiz</Radio.Button>
              </Radio.Group>
              {view === "course" ? renderCourseList() : renderQuizList()}
            </Card>
          </div>
        </Col>
        {/* User Info  */}
        <Col span={8}>
          <Card className={styles.info}>
            <h3>Personal Information</h3>
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item
                label="Contact method"
                name="contact"
                style={{ marginBottom: "10px" }}
              >
                <Input
                  placeholder="Tel/E-mail/social media id"
                  disabled={formLocked}
                />
              </Form.Item>
              <Form.Item
                label="Language you speak"
                name="language"
                style={{ marginBottom: "10px" }}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a language" disabled={formLocked}>
                  {languageOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Your interest"
                name="interest"
                style={{ marginBottom: "20px" }}
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select an Interest"
                  //onChange={(values) => setInterest(values as string)}
                  disabled={formLocked}
                >
                  {interestOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={formLocked}
                  >
                    Save and Find Study Partners
                  </Button>
                  <Button
                    htmlType="button"
                    className={styles.editInfo}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
          {/*Study Partner */}
          <Card title="Study Partners" className={styles.studyPartner}>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => {
                const interestsString = item.interests.join(", ");
                const description = `Interest: ${interestsString}  Language: ${item.language}`;

                return (
                  <List.Item
                    actions={[
                      <Button
                        key="sayhello"
                        type="primary"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Say Hi
                      </Button>,
                    ]}
                  >
                    <Skeleton avatar title={false} loading={initLoading} active>
                      <List.Item.Meta
                        title={item.username}
                        description={description}
                      />
                    </Skeleton>
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
      {/*Midal part */}
      <Modal
        title="Say Hello Confirmation"
        visible={showModal}
        confirmLoading={confirmLoading}
        onOk={() => {
          setConfirmLoading(true);
          setTimeout(() => {
            message.success(`You have sent message to successfully!`);
            setShowModal(false);
            setConfirmLoading(false);
            //TODO：一个put Message的接口
          }, 2000); //模拟异步
        }}
        onCancel={() => setShowModal(false)}
      >
        <p>Do you want to say hello to someone?</p>
      </Modal>
    </>
  );
}
