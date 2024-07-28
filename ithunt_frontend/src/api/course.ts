import request from "./../utils/request";
import {CourseQueryType, CourseType, FeedbackQueryType, UserType} from "./../type";
import qs from "qs";
import axios from "axios";

export async function getCourseList(params?: CourseQueryType) {
  return request.get(`/course/courseList?${qs.stringify(params)}`);
}
export async function getAllCourseList() {
  return request.get(`/course/allCourse`);
}

export async function courseAdd(params: CourseType) {
  return request.post("/course/add", params);
}
export async function courseUpdate(params: CourseType) {
  return request.put(`/course/update`, params);
}

export async function courseDelete(id: number) {
  return request.delete(`/course/delete/${id}`);
}
export async function getCourseDetails(id: number) {
  return request.get(`/course/details/${id}`);
}
// 抽取的封面上传函数
export async function coverUpload(cover: FormData) {
  return axios.post("http://localhost:9090/course/upload", cover, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
}

//feedback list
export async function getFeedbackList(params?: FeedbackQueryType) {
  return request.get(`/feedback/feedbackList?${qs.stringify(params)}`);
}

//get course feedback by course_id
export async function getFeedback(id: number) {
  return request.get(`/feedback/courseFeedback/${id}`);
}

export async function feedbackDelete(id: number) {
  return request.delete(`/feedback/delete/${id}`);
}





