import axios from "axios"
import { jwtConfig } from "./configs"

export const getUser = (id: number) => {
    return axios.get(
        `http://localhost:8080/api/user/get/${id}`,
        jwtConfig()
    )
}

export const getInstructors = () => {
    return axios.get(
        `http://localhost:8080/api/user/get_instructors`
    )
}

export const addStudent = (newStudent: any) => {
    return axios.post(
        `http://localhost:8080/api/user/save_student`,
        newStudent
    )
}