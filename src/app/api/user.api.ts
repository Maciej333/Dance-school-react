import axios from "axios";
import { jwtConfig, jwtContentConfig } from "./configs";

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

export const changePassword = (userId: number, password: string) => {
    return axios.put(
        `http://localhost:8080/api/user/change_password/${userId}`,
        password,
        jwtContentConfig()
    )
}

export const addStudentToEmployee = (userId: number, student: { gender: number, email: string | null, discount: number }) => {
    return axios.put(
        `http://localhost:8080/api/user/add_student/${userId}`,
        student,
        jwtContentConfig()
    )
}