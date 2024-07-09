import { VocabularyQueryType, VocabularyType } from "@/type/glossary";
import request from "./../utils/request";
import qs from "qs";

export async function getVocabularyList(params?: VocabularyQueryType) {
  return request.get(`/api/glossary?${qs.stringify(params)}`);
}

export async function vocabularyAdd(params: VocabularyType) {
  return request.post("/api/glossary", params);
}
