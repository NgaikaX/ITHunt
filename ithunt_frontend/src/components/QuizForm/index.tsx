// QuizPage.tsx
import { useState } from "react";
import { Button, message, Space } from "antd";
import { useRouter } from "next/router";
import { QuestionType } from "@/type/question";
import Question from "../Question";

export default function QuizPage({ questions }: { questions: QuestionType[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = () => {
    // TODO: Submit answers to the backend
    console.log("Submitted answers:", answers);
    message.success("Quiz submitted successfully!");
    router.push("/resultpage");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz</h1>
      <Question question={currentQuestion} />
      <Space>
        <Button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
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
          disabled={currentQuestionIndex !== questions.length - 1}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
}
