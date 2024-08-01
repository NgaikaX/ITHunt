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
}
export async function userAdd(params: UserType) {
  return request.post("/user/add", params);
}

export async function getUserDetails(id: number) {
  return request.get(`/user/details/${id}`);
}

export async function userDelete(id: number) {
  return request.delete(`/user/delete/${id}`);
}

export async function userUpdate(params: UserType) {
  return request.put(`/user/update`, params);
}

export async function userLogin(params: Pick<UserType, "email" | "password">) {
  return request.post("/login", params);
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

export async function getUserCourseList(user_id: number) {
  return request.get("/userCourse/UserCourseList",{params: { user_id } });
}
export async function getUserQuizList(user_id: number) {
  return request.get("/userQuiz/userQuizList",{params: { user_id } });
}
export async function QuizHasSubmited(user_id: number) {
  return request.get("/userQuestion/UserQuestionList",{params: { user_id } });
}

export async function submitQuiz(params:  SubmitQuizType[]) {
  return request.post("/userQuestion/submitQuiz", params);
}

export async function getCourseCompletion(user_id: number) {
  return request.get("/userCourse/courseCompletion",{params: { user_id } });
}
export async function getQuizCompletion(user_id: number) {
  return request.get("/userQuiz/quizCompletion",{params: { user_id } });
}