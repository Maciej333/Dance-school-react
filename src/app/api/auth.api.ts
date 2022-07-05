import axios from "axios"
import { AuthLogin } from "../model/auth.model"
import { jwtTokenRefresh } from "../store/auth/authSlice"

export const loginAPI = (data: AuthLogin) => {
    return axios.post(
        "http://localhost:8080/api/auth/login",
        `username=${data.login}&password=${data.password}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const refreshAPI = () => {
    return axios.get(
        "http://localhost:8080/api/user/refresh",
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(jwtTokenRefresh)
            }
        }
    )
}