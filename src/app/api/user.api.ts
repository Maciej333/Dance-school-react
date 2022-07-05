import axios from "axios"

export const getUser = (id: number) => {
    return axios.get(
        `http://localhost:8080/api/user/get/${id}`
    )
}