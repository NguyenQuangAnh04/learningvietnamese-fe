import { vocabularyResponse } from "../hooks/useVocabulay";
import { VocabularyDTO } from "../types/Lession";
import api from "./axiosClient";

export async function getVocabularies(word: string, lessonId: number | null, page: number): Promise<vocabularyResponse> {
    const res = await api.get<vocabularyResponse>("/vocabulary", { params: { word, lessonId, page } });
    return res.data;
}
export const addVocabulary = (vocabularyDTO: VocabularyDTO[], lessonId: number) => {
    return api.post(`/vocabulary/add/${lessonId}`, vocabularyDTO);
}

export const updateVocabulary = (vocabularyDTO: VocabularyDTO) => {
    return api.put('/vocabulary/update', vocabularyDTO);
}
export const importExcel = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/vocabulary/import", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}