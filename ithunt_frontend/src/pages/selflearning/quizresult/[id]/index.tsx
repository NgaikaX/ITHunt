// ResultPage.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuizForm from "@/components/QuizForm";
import {getUserQuestionAnswer} from "@/api";

const ResultPage = () => {
    const router = useRouter();
    const { id } = router.query; // 假设你通过路由参数获取 courseId
    const [quizAnswer, setQuizAnswer] = useState<any[]>([]);
    const courseId = typeof id === 'string' ? parseInt(id) : undefined;


    useEffect(() => {
        if (courseId) {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = userData.id || null;
            if (userId) {
                // 构建对象
                const courseParams = {
                    userId: userId,
                    courseId: courseId,
                };
                getUserQuestionAnswer(courseParams).then((results) => {
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
