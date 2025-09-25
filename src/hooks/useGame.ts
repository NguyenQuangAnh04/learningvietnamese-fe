import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submit } from "../service/gameService";

export function useSubmitAnswer() {
    const useQuery = useQueryClient();
    return useMutation({
        mutationFn: async (answerDTO: AnswerDTO) => {
            const res = await submit(answerDTO);
            return res.data;
        },
        onSuccess: () => {
            useQuery.invalidateQueries({ queryKey: ["game"] })
        }
    })
}

