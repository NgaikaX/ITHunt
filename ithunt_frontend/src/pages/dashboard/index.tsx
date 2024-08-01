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
import {MessageType, UserCourseType, UserInfoType, UserQuizType} from "@/type";
import {
  getCourseCompletion, getQuizCompletion,
  getUserCourseList, getUserInfo,
  getUserInfoList,
  getUserQuizList, sendMessage,
  userInfoAdd,
} from "@/api";
import { useRouter } from "next/router";

export default function Dashboard() {
  const Option = Select.Option;
  const router = useRouter();
  const [coursePercent, setCoursePercent] = useState<number>(null);
  const [quizPercent, setQuizPercent] = useState<number>(null);
  const[userInfo, setUserInfo] = useState<UserInfoType>(null);
  const [form] = Form.useForm();

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
  const [formLocked, setFormLocked] = useState(false);

  //course Table card and study partners card
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<UserInfoType[]>([]);
  const [course, setCourse] = useState<UserCourseType[]>([]);
  const [quiz, setQuiz] = useState<UserQuizType[]>([]);
  const [view, setView] = useState("course");
  const[user_id, setUserID] = useState(null);
  const[userName, setUserName] = useState<string>('');


  //Modal
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const[messageConfirmation, setConfirmation] = useState<string>('');
  const[receiver_id, setReceiverID] = useState(null);

  const handleFinish = async (values: UserInfoType) => {
    values.userId = user_id;
    values.username = userName;
    await userInfoAdd({...values});//add or update user info
    message.success("Information Added Successfully");
    await fetchData(user_id);
    setFormLocked(true); //lock the form
  };
  const handleEdit = () => {
    setFormLocked(false); //unlock the form
  };

  async function fetchData(value?: any) {
    //get user's course list
    try {
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

      //get User info
      const infoRes = await getUserInfo(user_id);
      const userInfoData = infoRes.data;
      setUserInfo(userInfoData);

      if (userInfoData && Object.keys(userInfoData).length > 0) {
        form.setFieldsValue(userInfoData); // when has userInfo fill the form
        setFormLocked(true); // lock the form
      } else {
        form.resetFields(); // when userInfo is null clear the form
        setFormLocked(false); // unlock the form
      }

      //get study partner list
      const res = await getUserInfoList(user_id);
      const { data } = res; // Correctly access data here
      console.log("data",data);
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
      setUserName(userData.username ||"");
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
  const handleSendMessage = async () =>{
    setConfirmLoading(true);
    try {
      const messageData:MessageType = {
        senderId: user_id,
        senderName:userName,
        recieverId:receiver_id,
        contact:userInfo.contact,
        interest:userInfo.interest,
        language:userInfo.language
      };
      await sendMessage(messageData);
      message.success('You have sent message successfully!');
      setShowModal(false);
    } catch (error) {
      message.error('Failed to send message.');
    } finally {
      setConfirmLoading(false);
    }
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
          item.complete === true ? (btn = "Review") : (btn = "Learn");
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
            <Form layout="vertical"
                  onFinish={handleFinish}
                  form={form}
                  initialValues={userInfo}>
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
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => {
                const description = `Interest: ${item.interest} Language: ${item.language}`;
                const confirmation = `Do you want to say hi and send you contact information to ${item.username}`
                const itemId = item.userId;
                return (
                  <List.Item
                    actions={[
                      <Button
                        key="sayhello"
                        type="primary"
                        onClick={() => {
                          setShowModal(true);
                          setConfirmation(confirmation);
                          setReceiverID(itemId)
                        }}
                      >
                        Say Hi
                      </Button>,
                    ]}
                  >
                    <Skeleton avatar title={false} loading={initLoading} active >
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
      {/*Modal part */}
      <Modal
          title="Say Hello Confirmation"
          open={showModal}
          confirmLoading={confirmLoading}
          onOk={handleSendMessage}
          onCancel={() => setShowModal(false)}
      >
        <p>{messageConfirmation}</p>
      </Modal>
    </>
  );
}
