import { QuestionQueryType, QuestionType } from "@/type/question";
import request from "@/utils/request";
import qs from "qs";

export async function getQuestionList(params?: QuestionQueryType) {
  return request.get(`/question/questionList?${qs.stringify(params)}`);
}
//get question list by course_id
export async function getQuizQuestions(id: number) {
  return request.get(`/question/getQuestion/${id}`);
}

export async function questionAdd(params: QuestionType) {
  return request.post("/question/add", params);
}

export async function questionDelete(id: number) {
  return request.delete(`/question/delete/${id}`);
}

export async function questionDetails(id: number) {
  return request.get(`/question/details//${id}`);
}

export async function questionUpdate(params: QuestionType) {
  return request.put(`/question/update`, params);
}

