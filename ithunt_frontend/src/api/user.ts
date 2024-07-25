import request from "../utils/request";
import {
  SubmitQuizType,
  UserInfoQueryType,
  UserInfoType,
  UserQueryType,
  UserType,
} from "../type";
import qs from "qs";
import axios from "axios";

export async function getUserList(params?: UserQueryType) {
  return request.get(`/user/selectByPage?${qs.stringify(params)}`);
  //return request.get(`/api/user?${qs.stringify(params)}`);
}
export async function userAdd(params: UserType) {
  return request.post("/user/add", params);
  //return request.post("/api/user", params);
}

export async function getUserDetails(id: number) {
  return request.get(`http://localhost:9090/user/details/${id}`);
  //return request.get(`/api/user/${id}`);
}

export async function userDelete(id: number) {
  return request.delete(`/user/delete/${id}`);
  //return request.delete(`/api/user/${id}`);
}

export async function userUpdate(params: UserType) {
  return request.put(`/user/update`, params);
  //return request.put(`/api/user`, params);
}

export async function userLogin(params: Pick<UserType, "email" | "password">) {
  return request.post("/login", params);
  //return request.post("/api/login", params);
}
export async function userLogout() {
  return request.get("/api/logout");
}
export async function userInfoAdd(params: UserInfoType) {
  return request.post("/api/userinfo", params);
}
export async function getUserInfoList(params?: UserInfoQueryType) {
  return request.get(`/api/userinfo?${qs.stringify(params)}`);
}
export async function getUserCourseList() {
  return request.get(`/api/usercourse`);
}
export async function getUserQuizList() {
  return request.get(`/api/userquiz`);
}

export async function submitQuiz(params: SubmitQuizType) {
  return request.post("/api/submitquiz", params);
}
