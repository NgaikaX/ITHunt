import { QuestionQueryType, QuestionType } from "@/type/question.d ";
import request from "@/utils/request";
import qs from "qs";

export async function getQuestionList(params?: QuestionQueryType) {
  return request.get(`/api/question?${qs.stringify(params)}`);
}

export async function questionAdd(params: QuestionType) {
  return request.post("/api/question", params);
}

export async function questionDelete(id: string) {
  return request.delete(`/api/question/${id}`);
}
