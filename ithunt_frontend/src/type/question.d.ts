import { QUESTION_TYPE } from "@/constants";

export interface QuestionQueryType {
  course_id: number;
  coursename?: string;
  type?: QUESTION_TYPE;
  current?: number;
  pageSize?: number;
}
export interface QuestionType {
  course_id: number;
  coursename: string;
  type: string;
  num: number;
  content: string;
  answer: string;
  id?: string;
  options: string[];
}
