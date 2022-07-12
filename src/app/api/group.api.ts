import axios from "axios";

export const getOpenGroups = () => {
    return axios.get(
        `http://localhost:8080/api/group/get_open`
    )
}

export const getGroup = (id: number) => {
    return axios.get(
        `http://localhost:8080/api/group/get/${id}`
    )
}