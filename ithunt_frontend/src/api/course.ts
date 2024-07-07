import { CourseQueryType } from "@/type";
import axios from "axios";
import qs from "qs";

export async function getCourseList(params?: CourseQueryType) {
  const res = await axios(
    `http://127.0.0.1:4523/m1/4782268-4436149-default/api/courses?${qs.stringify(
      params
    )}`
  );
  return res.data;
}
