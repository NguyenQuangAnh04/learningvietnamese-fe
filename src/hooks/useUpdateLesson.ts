import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateLesson } from '../service/lessonService';
import { LessonDTO } from '../types/Lession';

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ( data : LessonDTO) => updateLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success('Lesson updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update lesson');
    },
  });
};