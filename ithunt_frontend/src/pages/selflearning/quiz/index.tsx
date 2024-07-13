import { questionDetails } from "@/api";
import Question from "@/components/Question";
import QuizForm from "@/components/QuizForm";
import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";

const sampleQuestions: QuestionType[] = [
  {
    id: "1",
    num: "1",
    coursename: "Sample Course",
    type: QUESTION_TYPE.MUL,
    content: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "C",
  },
  {
    id: "2",
    num: "2",
    coursename: "Sample Course",
    type: QUESTION_TYPE.FREE_TEXT,
    content: "Describe the water cycle.",
    options: [],
    answer: "The water cycle is...",
  },
  {
    id: "3",
    num: "3",
    coursename: "Sample Course",
    type: QUESTION_TYPE.TF,
    content: "The Earth is flat.",
    options: [],
    answer: "false",
  },
];

export default function Home() {
  return <QuizForm questions={sampleQuestions} />;
}
