import { questionDetails } from "@/api";
import Question from "@/components/Question";
import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";

const sampleQuestions: QuestionType = {
  id: "1",
  num: "1",
  coursename: "Sample Course",
  type: QUESTION_TYPE.MUL,
  content: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Lisbon"],
  answer: "C",
};
export default function Home() {
  return <Question question={sampleQuestions} />;
}
