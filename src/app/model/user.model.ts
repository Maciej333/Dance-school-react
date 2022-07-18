import { UserRole } from "../utils/enum/UserRole.enum"
import { Instructor } from "./instructor.model"
import { Student } from "./student.model"

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    roles: UserRole[],
    employee: Instructor | null
    student: Student | null
}

export const initUser: User = {
    id: -1,
    firstname: '',
    lastname: '',
    roles: [],
    employee: null,
    student: null
}