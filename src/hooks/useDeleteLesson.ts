import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteLesson } from "../service/lessonService";

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    useMutation({
        mutationFn: (id: number) => {
            return deleteLesson(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            toast.success('Lesson deleted successfully!');
        }
    })
}