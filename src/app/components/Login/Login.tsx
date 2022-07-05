import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Login.style.scss';
import { useAppDispatch, useAppSelector } from '../../hook/store.hook';
import { login, selectAuth } from '../../store/auth/authSlice';
import { notEmpty, stringLength, validate, validator } from '../../utils/validators/validators';

export default function Login() {

    const { loading, error } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        login: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },
    })

    const setError = (name: string, msg: string) => () => {
        setFormData(prev => {
            return {
                ...prev,
                [name]: {
                    ...prev[name as (keyof typeof formData)],
                    error: msg
                }
            }
        })
    }

    const [formDataValidators] = useState({
        login: [
            validator(setError("login", "min string length is 3"))(stringLength(5, 6)),
            validator(setError("login", "Login is required"))(notEmpty),
        ],
        password: [
            validator(setError("password", "Password is required"))(notEmpty)
        ],
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: {
                    error: '',
                    value: value
                }
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate(formData, formDataValidators)) {
            const data = {
                login: formData.login.value,
                password: formData.password.value
            }
            dispatch(login(data))
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <span className='main-error'>{error}</span>

            <label htmlFor='login'><span>*</span>Login</label>
            <input id='login' name='login' value={formData.login.value} onChange={handleChange}></input>
            <span className='error'>{formData.login.error}</span>

            <label htmlFor='password'><span>*</span>Password</label>
            <input id='password' name='password' value={formData.password.value} onChange={handleChange}></input>
            <span className='error'>{formData.password.error}</span>

            <button type='submit'>Submit</button>
        </form>
    )
}
