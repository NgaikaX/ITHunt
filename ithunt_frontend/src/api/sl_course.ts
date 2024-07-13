import request from "./../utils/request";
import { Sl_CourseQueryType, Sl_CourseType } from "./../type";
import qs from "qs";

export async function getSl_CourseList(params?: Sl_CourseQueryType) {
  return request.get(`/api/sl_courses?${qs.stringify(params)}`);
}
export async function slCourseAdd(params: Sl_CourseType) {
  return request.post("/api/sl_courses", params);
}

export async function slCourseDelete(id: string) {
  return request.delete(`/api/sl_courses/${id}`);
}

export async function getSlCourseDetails(id: string) {
  return request.get(`/api/sl_courses/${id}`);
}

export async function slCourseUpdate(params: Sl_CourseType) {
  return request.put(`/api/sl_courses`, params);
}
