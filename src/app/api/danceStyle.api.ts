import axios from "axios"
import { jwtConfig } from "./configs"

export const getDanceStyles = () => {
    return axios.get(
        `http://localhost:8080/api/dance_style/get_all`
    )
}

export const getDanceStyle = (id: number) => {
    return axios.get(
        `http://localhost:8080/api/dance_style/get/${id}`,
        jwtConfig()
    )
}