import { UserRole } from "../utils/enum/UserRole.enum"

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    roles: typeof UserRole[],
}

export const initUser: User = {
    id: -1,
    firstname: '',
    lastname: '',
    roles: [],
}