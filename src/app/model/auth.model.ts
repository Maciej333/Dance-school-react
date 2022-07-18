import { User } from "./user.model"

export type AuthState = {
    user: User,
    role: number | null,
    loading: boolean,
    error: string
}

export type AuthLogin = {
    login: string,
    password: string
}