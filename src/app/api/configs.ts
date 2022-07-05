import { jwtTokenActive } from "../store/auth/authSlice";

export const jwtConfig = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(jwtTokenActive)
        }
    }
}