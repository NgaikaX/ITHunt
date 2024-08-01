import request from "./../utils/request";
import { Sl_CourseQueryType, Sl_CourseType } from "./../type";
import qs from "qs";
import axios from "axios";
//query sl_course
export async function getSl_CourseList(params?: Sl_CourseQueryType) {
  return request.get(`/sl_course/sl_courseList?${qs.stringify(params)}`);
}
//get all course
export async function getAllSl_CourseList() {
  return request.get(`/sl_course/allSl_Course`);
}
//get a course's details
export async function getSlCourseDetails(id: string) {
  return request.get(`/sl_course/details/${id}`);
}
//add a couse
export async function slCourseAdd(params: Sl_CourseType) {
  return request.post("/sl_course/add", params);
}

export async function slCourseDelete(id: string) {
  return request.delete(`/sl_course/delete/${id}`);
}

export async function slCourseUpdate(params: Sl_CourseType) {
  return request.put(`/sl_course/update`, params);
}

// upload cover
export async function slCourseCoverUpload(cover: FormData) {
  return axios.post("http://localhost:9090/sl_course/upload", cover, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
}
// upload video
export async function slCourseVideoUpload(video: FormData) {
  return axios.post("http://localhost:9090/sl_course/uploadVideo", video, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
}
