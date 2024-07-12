import { QUESTION_TYPE } from "@/constants";

export interface QuestionQueryType {
  coursename?: string;
  type?: QUESTION_TYPE;
  current?: number;
  pageSize?: number;
}
export interface QuestionType {
  coursename: string;
  type: QUESTION_TYPE;
  num: string;
  content: string;
  answer: string;
  id?: string;
}
