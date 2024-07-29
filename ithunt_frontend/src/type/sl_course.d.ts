export interface Sl_CourseQueryType {
  coursename?: string;
  current?: number;
  pageSize?: number;
}
export interface Sl_CourseType {
  coursename: string;
  cover: string;
  videourl: string;
  description: string;
  uploaddate:string;
  id?: string;
}
