import { useQuery } from "@tanstack/react-query";
import { getVocabularies } from "../service/vocabularyService";
import { VocabularyDTO } from "../types/Lession";
export interface vocabularyResponse {
    totalPage: number;
    vocabularies: VocabularyDTO[];
}
export function useVocabularyQuery(word?: string, page?: number) {
    return useQuery<vocabularyResponse>({
        queryKey: ['vocabularies', word, page],
        queryFn: () => {

            return getVocabularies(word || '', page || 0);
        }
    })
}