import axios from "axios"
import { jwtConfig } from "./configs"

export const getUser = (id: number) => {
    return axios.get(
        `http://localhost:8080/api/user/get/${id}`,
        jwtConfig()
    )
}