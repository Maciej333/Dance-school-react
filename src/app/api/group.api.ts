import axios from "axios";
import { DanceLevel } from "../utils/enum/DanceLevel.enum";
import { GroupStatus } from "../utils/enum/GroupStatus.enum";
import { jwtConfig, jwtContentConfig } from "./configs";

export const getOpenGroups = () => {
    return axios.get(`http://localhost:8080/api/group/get_open`);
};

export const getStudentGroups = (studentId: number) => () => {
    return axios.get(`http://localhost:8080/api/student/get_groups/${studentId}`, jwtConfig());
};

export const getInstructorGroups = (instructorId: number) => () => {
    return axios.get(`http://localhost:8080/api/instructor/get_groups/${instructorId}`, jwtConfig());
};

export const getAllGroups = () => {
    return axios.get(`http://localhost:8080/api/group/get_all`, jwtConfig());
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

export const addGroupCourse = (
    course: any
) => {
    return axios.post(
        `http://localhost:8080/api/group/save_course`,
        course,
        jwtContentConfig()
    );
};

export const addGroupChoreo = (
    choreo: any
) => {
    return axios.post(
        `http://localhost:8080/api/group/save_choreo`,
        choreo,
        jwtContentConfig()
    );
};

export const updateGroupCourse = (
    groupId: number,
    course: any
) => {
    return axios.put(
        `http://localhost:8080/api/group/update_course/${groupId}`,
        course,
        jwtContentConfig()
    );
};

export const updateGroupChoreo = (
    groupId: number,
    choreo: any
) => {
    return axios.put(
        `http://localhost:8080/api/group/update_choreo/${groupId}`,
        choreo,
        jwtContentConfig()
    );
};

export const deleteGroup = (groupId: number) => {
    return axios.delete(
        `http://localhost:8080/api/group/delete/${groupId}`,
        jwtConfig()
    );
}