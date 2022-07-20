import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../App';
import { addStudentToEmployee } from '../../../app/api/user.api';
import { useAppDispatch, useAppSelector } from '../../../app/hook/store.hook';
import { refresh, selectAuth } from '../../../app/store/auth/authSlice';
import { notEmpty, validate, validator } from '../../../app/utils/validators/validators';

export default function ProfileFormAddStudent() {

  const { id } = useAppSelector(selectAuth).user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setValue } = useContext(ModalContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    gender: {
      value: '',
      error: ""
    },
    email: {
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
    gender: [
      validator(setError("gender", "Gender is required"))(notEmpty),
    ]
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const student = {
        gender: +formData.gender.value,
        email: formData.email.value ? formData.email.value : null,
        discount: 50
      }
      addStudentToEmployee(id, student)
        .then(data => {
          if (data.data.status === 200) {
            navigate("/profile");
            setValue("Student profile was added");
            dispatch(refresh())
          } else {
            setMessage("Cannot update user password")
          }
        })
        .catch(err => {
          setMessage("Cannot update user password")
        })
    }

  };

  return (
    <form className='form form-edit-password' onSubmit={handleSubmit}>
      <span className="main-error" style={{ marginTop: "10px" }}>
        {message}
      </span>

      <label htmlFor='gender'>Gender <span>*</span></label>
      <select id="gender" name="gender" value={formData.gender.value} onChange={handleChange}>
        <option value="">***</option>
        <option value="0">Male</option>
        <option value="1">Female</option>
      </select>
      <span className="error">{formData.gender.error}</span>

      <label htmlFor='email'>Email</label>
      <input id="email" name="email" type="email" value={formData.email.value} onChange={handleChange}></input>
      <span className="error">{formData.email.error}</span>

      <button type='submit'>Submit</button>
    </form>
  )
}
