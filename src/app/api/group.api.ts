import axios from "axios";
import { DanceLevel } from "../utils/enum/DanceLevel.enum";
import { jwtContentConfig } from "./configs";

export const getOpenGroups = () => {
    return axios.get(`http://localhost:8080/api/group/get_open`);
};

export const getGroup = (id: number) => {
    return axios.get(`http://localhost:8080/api/group/get/${id}`);
};

export const updateGroupLevel = (id: number, newLevel: DanceLevel) => {
    return axios.put(
        `http://localhost:8080/api/group/udpate_level/${id}`,
        newLevel,
        jwtContentConfig()
    );
};
