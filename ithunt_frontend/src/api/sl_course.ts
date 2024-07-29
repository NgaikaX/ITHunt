import request from "./../utils/request";
import { Sl_CourseQueryType, Sl_CourseType } from "./../type";
import qs from "qs";
import axios from "axios";

export async function getSl_CourseList(params?: Sl_CourseQueryType) {
  return request.get(`/sl_course/sl_courseList?${qs.stringify(params)}`);
}
export async function getAllSl_CourseList() {
  return request.get(`/sl_course/allSl_Course`);
}
export async function slCourseAdd(params: Sl_CourseType) {
  return request.post("/sl_course/add", params);
}

export async function slCourseDelete(id: string) {
  return request.delete(`/sl_course/delete/${id}`);
}

export async function getSlCourseDetails(id: string) {
  return request.get(`/sl_course/details/${id}`);
}

export async function slCourseUpdate(params: Sl_CourseType) {
  return request.put(`/sl_course/update`, params);
}

// 抽取的封面上传函数
export async function slCourseCoverUpload(cover: FormData) {
  return axios.post("http://localhost:9090/sl_course/upload", cover, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
}
// 视频上传
export async function slCourseVideoUpload(video: FormData) {
  return axios.post("http://localhost:9090/sl_course/uploadVideo", video, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
}
