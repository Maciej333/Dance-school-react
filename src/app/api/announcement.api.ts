import axios from "axios";
import { jwtConfig } from "./configs";

export const getSchoolAnns = () => {
    return axios.get(
        `http://localhost:8080/api/announcement/get_school_anns`
    )
}

export const getGroupAnns = (groupId: number) => {
    return axios.get(
        `http://localhost:8080/api/announcement/get_group_anns/${groupId}`,
        jwtConfig()
    )
}