import { vocabularyResponse } from "../hooks/useVocabulay";
import api from "./axiosClient"

export async function getVocabularies (word:string, page: number): Promise<vocabularyResponse>  {
    const res = await api.get<vocabularyResponse>("/vocabulary", { params: { word, page } });
    return res.data;
}