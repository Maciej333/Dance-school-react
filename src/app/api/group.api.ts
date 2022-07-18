import axios from "axios";
import { DanceLevel } from "../utils/enum/DanceLevel.enum";
import { GroupStatus } from "../utils/enum/GroupStatus.enum";
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

export const updateGroupStatus = (id: number, newStatus: GroupStatus) => {
    return axios.put(
        `http://localhost:8080/api/group/udpate_status/${id}`,
        newStatus,
        jwtContentConfig()
    );
};

export const updateGroupInstructors = (
    id: number,
    newInstructors: number[]
) => {
    return axios.put(
        `http://localhost:8080/api/group/udpate_instructors/${id}`,
        newInstructors,
        jwtContentConfig()
    );
};
