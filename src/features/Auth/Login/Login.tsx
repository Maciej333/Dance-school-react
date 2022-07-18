import React, { ChangeEvent, FormEvent, useState } from "react";
import "./Login.style.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hook/store.hook";
import { login, selectAuth } from "../../../app/store/auth/authSlice";
import {
    notEmpty,
    stringLength,
    validate,
    validator,
} from "../../../app/utils/validators/validators";
import { Navigate, NavLink } from "react-router-dom";
import SmallLoading from "../../../app/components/SmallLoading/SmallLoading";
import withProtectedFromLogin from "../../../app/hoc/withProtectedFromLogin";

const LoginComponent = () => {

    const { loading, error, user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        login: {
            value: "",
            error: "",
        },
        password: {
            value: "",
            error: "",
        },
    });

    const setError = (name: string, msg: string) => () => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name as keyof typeof formData],
                    error: msg,
                },
            };
        });
    };

    const [formDataValidators] = useState({
        login: [
            validator(setError("login", "min string length is 3"))(
                stringLength(3)
            ),
            validator(setError("login", "Login is required"))(notEmpty),
        ],
        password: [
            validator(setError("password", "Password is required"))(notEmpty),
        ],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: {
                    error: "",
                    value: value,
                },
            };
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate(formData, formDataValidators)) {
            const data = {
                login: formData.login.value,
                password: formData.password.value,
            };
            dispatch(login(data));
        }
    };

    if (user.id > 0)
        return <Navigate to="/profile" />;

    return (
        loading ?
            <SmallLoading color="#ec994b" />
            :
            <>
                <p className="register-p">Don't have account?
                    <NavLink className="register-btn" to="/auth/register">Register now</NavLink>
                </p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="main-error">{error}</span>

                    <label htmlFor="login">
                        Login<span>*</span>
                    </label>
                    <input
                        id="login"
                        name="login"
                        value={formData.login.value}
                        onChange={handleChange}
                    ></input>
                    <span className="error">{formData.login.error}</span>

                    <label htmlFor="password">
                        Password<span>*</span>
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password.value}
                        onChange={handleChange}
                    ></input>
                    <span className="error">{formData.password.error}</span>

                    <button type="submit">Submit</button>
                </form>
            </>
    );
}

const Login = withProtectedFromLogin(LoginComponent);
export default Login;