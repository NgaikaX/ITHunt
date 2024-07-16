import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 假设这是你的结果页面组件
export default function ResultPage() {
  const router = useRouter();
  const [quizResult, setQuizResult] = useState<any>(null); // 假设 quizResult 包含了结果数据

  useEffect(() => {
    // 在这里获取结果数据，可以从路由参数或者其他地方获取
    const result = router.query.result; // 假设从路由参数中获取结果数据
    setQuizResult(result);
  }, [router.query.result]);

  if (!quizResult) {
    return <div>Loading...</div>; // 加载状态，可以根据实际情况修改
  }

  return (
    <div>
      <h1>Quiz Result</h1>
      <p>Your score: {quizResult.score}</p>
      <ul>
        {quizResult.answers.map((answer: any, index: number) => (
          <li key={index}>
            Question {index + 1}: {answer.question}
            <br />
            Your answer: {answer.userAnswer}
            <br />
            Correct answer: {answer.correctAnswer}
          </li>
        ))}
      </ul>
      <p>Thank you for taking the quiz!</p>
    </div>
  );
}
