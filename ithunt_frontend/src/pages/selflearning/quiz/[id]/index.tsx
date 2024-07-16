import { getQuestionList, getQuizQuestions, getUserDetails } from "@/api";
import QuizForm from "@/components/QuizForm";
import UserForm from "@/components/UserForm";
import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  /*useEffect(() => {
    const fetchQuestions = async () => {
      if (router.query.id) {
        try {
          const res = await getQuizQuestions(router.query.id as string);
          setQuestions(res.data);
          console.log("Fetched questions:", res);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();
  }, [router.query.id]);*/

  const sampleQuestions: QuestionType[] = [
    {
      id: "1",
      num: 1,
      course_id: 3,
      coursename: "Sample Course",
      type: "multiple choices",
      content: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "C",
    },
    {
      id: "2",
      num: 2,
      course_id: 3,
      coursename: "Sample Course",
      type: "true-false",
      content: "Describe the water cycle.",
      options: [],
      answer: "The water cycle is...",
    },
    {
      id: "3",
      num: 3,
      course_id: 3,
      coursename: "Sample Course",
      type: "free text",
      content: "The Earth is flat.",
      options: [],
      answer: "false",
    },
  ];
  console.log("test questions", questions);

  return <QuizForm questions={sampleQuestions} />;
}
