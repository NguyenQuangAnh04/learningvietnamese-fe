import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addUser } from "../service/userService";
import { UserDTO } from "../types/User";

export function useAddUser() {
    const useQuery = useQueryClient();
    return useMutation({
        mutationFn: async (userDTO: UserDTO) => {
            return await addUser(userDTO);
        },
        onSuccess: () => {
            useQuery.invalidateQueries({ queryKey: ['users'] });
            toast.success("Add user successfully");
        }
    })
}