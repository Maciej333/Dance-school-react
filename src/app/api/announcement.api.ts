import axios from "axios";

export const getSchoolAnns = () => {
    return axios.get(
        `http://localhost:8080/api/announcement/get_school_anns`
    )
}