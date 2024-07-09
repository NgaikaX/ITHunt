import request from "./../utils/request";
import { CourseQueryType, CourseType, FeedbackQueryType } from "./../type";
import qs from "qs";

export async function getCourseList(params?: CourseQueryType) {
  return request.get(`/api/courses?${qs.stringify(params)}`);
}
export async function courseAdd(params: CourseType) {
  return request.post("/api/courses", params);
}
export async function getFeedbackList(params?: FeedbackQueryType) {
  return request.get(`/api/feedback?${qs.stringify(params)}`);
}
