import GlossaryForm from "@/components/GlossaryForm";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getGlossaryDetails, getUserDetails} from "@/api";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState();
  console.log("Router query outside useEffect:", router.query);

  useEffect(() => {
    if (id) {
      getGlossaryDetails(Number(id)).then((res) => {
        setData(res.data);
        /*console.log("%c[res]-21",res);*/
      });
    }
  }, [id]);

  return <GlossaryForm editData={data}/>;
}
