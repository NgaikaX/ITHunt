import { getSlCourseDetails } from "@/api";
import Sl_CourseForm from "@/components/Sl_CourseForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      getSlCourseDetails(id as string).then((res) => {
        setData(res.data);
        //console.log(%c[res]-21",res);
      });
    }
  }, [id]);
  return <Sl_CourseForm editData={data} />;
}
