import {UserType, VocabularyQueryType, VocabularyType} from "../type";
import request from "./../utils/request";
import qs from "qs";

export async function getVocabularyList(params?: VocabularyQueryType) {
  return request.get(`/glossary/glossaryList?${qs.stringify(params)}`);
}

export async function vocabularyAdd(params: VocabularyType) {
  return request.post("/glossary/add", params);
}

export async function vocabularyDeleted(id: number) {
  return request.delete(`/glossary/delete/${id}`);
}
export async function getAllVocabularyList() {
  return request.get(`/glossary/allGlossary`);
}
export async function glossaryUpdate(params: VocabularyType) {
  return request.put(`/glossary/update`, params);
}
export async function getGlossaryDetails(id: number) {
  return request.get(`/glossary/details/${id}`);
}