import { User } from "./user.model"

export type Instructor = {
    id: number,
    phoneNumers: string[],
    hiredDate: Date,
    firedDate: Date | null,
    user: User
}