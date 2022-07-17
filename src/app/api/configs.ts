import { jwtTokenActive } from "../store/auth/authSlice";

export const jwtConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + localStorage.getItem(jwtTokenActive),
        },
    };
};

export const jwtContentConfig = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem(jwtTokenActive),
        },
    };
};
