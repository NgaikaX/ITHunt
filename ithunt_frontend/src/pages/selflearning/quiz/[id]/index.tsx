import { getQuizQuestions } from "@/api";
import QuizForm from "@/components/QuizForm";
import { QuestionType } from "@/type/question";
import { Alert, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (router.query.id) {
        try {
          const res = await getQuizQuestions(router.query.id as number);
          setQuestions(res.data);
        } catch (error) {
          console.error("Error fetching questions:", error);
          setError("Failed to fetch questions.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchQuestions();
  }, [router.query.id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!questions.length) {
    return <Alert message="No questions available" type="info" showIcon />;
  }

  return <QuizForm questions={questions} />;
}
