import { Gender } from "../utils/enum/Gender.enum"
import { User } from "./user.model"

export type Student = {
    id: number,
    discount: number,
    email: string,
    gender: Gender,
    user: User
}