// QuizPage.tsx
import {useEffect, useState} from "react";
import { Button, message, Space, Card, Row, Col, Modal } from "antd";
import { useRouter } from "next/router";
import Question from "../Question";
import styles from "./index.module.css";
import {submitQuiz} from "@/api";
import {SubmitQuizType} from "@/type";
import {formatTimestamp} from "@/utils";

export default function QuizPage({ questions, isReviewMode = false }: { questions, isReviewMode?: boolean }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const courseName = "test";
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userid, setUserId] = useState<number>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const id = router.query.id;

  // 调试输出 questions
  useEffect(() => {
    console.log("questions:", questions);
  }, [questions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUserId(userData.id || null);
    }
  }, []);

  useEffect(() => {
    if (isReviewMode) {
      const reviewAnswers = questions.reduce((acc, question, index) => {
        acc[index] = question.userAnswer || ""; // Ensure userAnswer exists
        return acc;
      }, {});
      setAnswers(reviewAnswers);
    }
  }, [isReviewMode, questions])

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async () => {
    const quizSubmissions: SubmitQuizType[] = questions.map((question, index) => ({
      userId: userid,
      courseId: question.course_id,
      questionId: question.id,
      userAnswer: answers[index] || "",
      submitTime: formatTimestamp(Date.now()),
      coursename: question.coursename,
    }));
    console.log("quizSubmissions",quizSubmissions);
    try {
      await submitQuiz(quizSubmissions);
      message.success("Quiz submitted successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      message.error("Failed to submit quiz.");
    }
    console.log("Submitted answers:", answers);
    //message.success("Quiz submitted successfully!");
    setShowModal(true);
  };
  const handleReview = () => {
    router.push(`/selflearning/quizresult/${id}`);
  };
  const handleBack = () => {
    router.back();
  };

  const handleNavigationClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions([...answeredQuestions, questionIndex]);
    }
  };

  const navigation = () => {
    return questions.map((question, index) => (
      <button
        key={index}
        className={`${styles.gridbutton} ${
          answeredQuestions.includes(index) ? styles.answeredButton : ""
        }`}
        onClick={() => handleNavigationClick(index)}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className={styles.containerWrap}>
      <h1>{courseName}</h1>
      <br />
      <Row gutter={24}>
        <Col span={18}>
          <Card className={styles.tableWrap}>
            <h4>Q{currentQuestionIndex + 1}: </h4>
            <Question
              question={currentQuestion}
              onAnswerChange={(answer: string) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
              answer={answers[currentQuestionIndex] || ""}
              isReviewMode={isReviewMode}
            />
          </Card>
          <div className={styles.btn}>
            <div className={styles.btn}>
              <Space>
                <Button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </Button>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={isReviewMode ||currentQuestionIndex !== questions.length - 1}
                >
                  Submit
                </Button>
              </Space>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <div className={styles.buttongrid}>{navigation()}</div>
          </div>
        </Col>
      </Row>
      <Modal
        title="Submitted"
        open={showModal}
        confirmLoading={confirmLoading}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="customButton" type="primary" onClick={handleReview}>
            Review
          </Button>,
          <Button key="cancelButton" onClick={handleBack}>
            Back to course
          </Button>,
        ]}
      >
        Quiz submitted successfully!
      </Modal>
    </div>
  );
}
