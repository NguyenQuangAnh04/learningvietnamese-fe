import { UserResponse } from "../hooks/useUser";
import { Role, UserDTO } from "../types/User";
import api from "./axiosClient";

export const getInforUser = () => {
    return api.get("/user/me");
};
export const logout = () => {
    return api.delete("/logout");
}
export const editProdile = (userDTO: UserDTO) => {
    return api.put("/user/edit-profile", userDTO)
}

export const addUser = (userDTO: UserDTO) => {
    return api.post("/user/add_user", userDTO)
}
export async function getUsers(keyword: string, role: Role, page: number): Promise<UserResponse> {
    const res = await api.get<UserResponse>("/user", { params: { keyword, role, page } });
    return res.data;
}