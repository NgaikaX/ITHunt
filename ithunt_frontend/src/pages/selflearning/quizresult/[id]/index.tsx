// ResultPage.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuizForm from "@/components/QuizForm"; // 假设 QuizForm 是我们要重用的组件
import {getQuizQuestions, getUserQuestionAnswer} from "@/api"; // 假设你有一个 API 调用来获取测验结果

const ResultPage = () => {
    const router = useRouter();
    const { id } = router.query; // 假设你通过路由参数获取 courseId
    const [quizAnswer, setQuizAnswer] = useState<any[]>([]);

    const courseId = id as number;
    useEffect(() => {
        if (courseId) {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = userData.id || null;
            if (userId) {
                getUserQuestionAnswer(userId, courseId).then((results) => {
                    setQuizAnswer(results.data);
                });
            }
        }
    }, [courseId]);
    useEffect(() => {
        console.log("quizAnswer:",quizAnswer);
    }, [quizAnswer]);


    return (
        //<>test</>
        <QuizForm questions={quizAnswer} isReviewMode={true} />
    );
}

export default ResultPage;
