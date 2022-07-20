import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './ProfileFormEditPassword.style.scss';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../App';
import { changePassword } from '../../../app/api/user.api';
import { useAppSelector } from '../../../app/hook/store.hook';
import { selectAuth } from '../../../app/store/auth/authSlice';
import { notEmpty, stringLength, validate, validator } from '../../../app/utils/validators/validators';

export default function ProfileFormEditPassword() {

  const { id } = useAppSelector(selectAuth).user;
  const navigate = useNavigate();
  const { setValue } = useContext(ModalContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    password: {
      value: "",
      error: ""
    },
    repeatPassword: {
      value: "",
      error: ""
    },
  })

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
    password: [
      validator(setError("password", "min length is 3 chars"))(stringLength(3)),
      validator(setError("password", "Password is required"))(notEmpty),
    ]
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
    if (formData.password.value === formData.repeatPassword.value) {
      if (validate(formData, formDataValidators)) {
        changePassword(id, formData.password.value)
          .then(data => {
            navigate("/profile");
            setValue("Password was updated");
          })
          .catch(err => {
            setMessage("Cannot update user password")
          })
      }
    } else {
      setFormData(prev => {
        return {
          ...prev,
          repeatPassword: {
            ...prev.repeatPassword,
            error: "Password must match"
          }
        }
      });
    }
  };

  return (
    <form className='form form-edit-password' onSubmit={handleSubmit}>
      <span className="main-error" style={{ marginTop: "10px" }}>
        {message}
      </span>

      <label htmlFor='password'>Password <span>*</span></label>
      <input id="password" name="password" type="password" value={formData.password.value} onChange={handleChange}></input>
      <span className="error">{formData.password.error}</span>

      <label htmlFor='repeatPassword'>Repeat password <span>*</span></label>
      <input id="repeatPassword" name="repeatPassword" type="password" value={formData.repeatPassword.value} onChange={handleChange}></input>
      <span className="error">{formData.repeatPassword.error}</span>

      <button type='submit'>Submit</button>
    </form>
  )
}
