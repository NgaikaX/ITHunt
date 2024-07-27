import { getUserDetails } from "@/api";
import UserForm from "@/components/UserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState();
  console.log("Router query outside useEffect:", router.query);

    useEffect(() => {
        if (id) {
            getUserDetails(Number(id)).then((res) => {
                setData(res.data);
                /*console.log("%c[res]-21",res);*/
            });
        }
    }, [id]);


    return <UserForm editData={data} />;
}
