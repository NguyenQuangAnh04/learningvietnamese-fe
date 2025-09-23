import { UserDTO } from "../types/User";
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