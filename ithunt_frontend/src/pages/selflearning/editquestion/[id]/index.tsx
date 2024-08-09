import { questionDetails } from "@/api";
import QuestionForm from "@/components/QuestionForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState();

  const questionIdNumber = typeof id === 'string' ? parseInt(id) : undefined;

  useEffect(() => {
    if (id) {
      questionDetails(questionIdNumber).then((res) => {
        setData(res.data);
      });
    }
  }, [id]);
  return <QuestionForm editData={data} />;
}
