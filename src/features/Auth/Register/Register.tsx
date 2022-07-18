import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Register.style.scss';
import { notEmpty, stringLength, validate, validator } from '../../../app/utils/validators/validators';
import { addStudent } from '../../../app/api/user.api';
import withProtectedFromLogin from '../../../app/hoc/withProtectedFromLogin';

const STUDENT_ADDED = "Account created successfully";

const RegisterComponent = () => {

  const [formData, setFormData] = useState({
    login: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    },
    repeatPassword: {
      value: "",
      error: ""
    },
    firstName: {
      value: "",
      error: ""
    },
    lastName: {
      value: "",
      error: ""
    },
    gender: {
      value: '',
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
  });
  const [message, setMessage] = useState('');

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
      validator(setError("login", "Login length min 3 chars"))(stringLength(3, 30)),
      validator(setError("login", "Login is required"))(notEmpty),
    ],
    password: [
      validator(setError("password", "Password length min 3 chars"))(stringLength(3, 30)),
      validator(setError("password", "Password is required"))(notEmpty),
    ],
    firstName: [
      validator(setError("firstName", "Firstname length min 3 chars"))(stringLength(3, 30)),
      validator(setError("firstName", "Firstname is required"))(notEmpty),
    ],
    lastName: [
      validator(setError("lastName", "Lastname length min 3 chars"))(stringLength(3, 30)),
      validator(setError("lastName", "Lastname is required"))(notEmpty),
    ],
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
    if (formData.password.value === formData.repeatPassword.value) {
      if (validate(formData, formDataValidators)) {
        const student = {
          login: formData.login.value,
          password: formData.password.value,
          firstname: formData.firstName.value,
          lastname: formData.lastName.value,
          email: formData.email.value || null,
          gender: formData.gender.value,
          discount: 0
        };
        addStudent(student)
          .then(data => {
            if (data.data.status === 200) {
              setMessage(STUDENT_ADDED);
            }
            if (data.data.status === 500) {
              setMessage("Error cannot register account");
            }
            if (data.data.status === 501) {
              setFormData(prev => {
                return {
                  ...prev,
                  login: {
                    ...prev.repeatPassword,
                    error: "Login in occupied"
                  }
                }
              });
            }
          })
          .catch(err => {
            setMessage("Error cannot register account");
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
    message === STUDENT_ADDED ?
      <h2 className='form-h h-ok'>{message}</h2>
      :
      <>
        <h2 className='form-h'>Register Account</h2>
        <form className='form register-form' onSubmit={handleSubmit}>
          <span className="main-error">{message}</span>

          <label htmlFor='login'>Login <span>*</span></label>
          <input id="login" name="login" value={formData.login.value} onChange={handleChange}></input>
          <span className="error">{formData.login.error}</span>

          <label htmlFor='password'>Password <span>*</span></label>
          <input id="password" name="password" type="password" value={formData.password.value} onChange={handleChange}></input>
          <span className="error">{formData.password.error}</span>

          <label htmlFor='repeatPassword'>Repeat password <span>*</span></label>
          <input id="repeatPassword" name="repeatPassword" type="password" value={formData.repeatPassword.value} onChange={handleChange}></input>
          <span className="error">{formData.repeatPassword.error}</span>

          <label htmlFor='firstName'>Firstname <span>*</span></label>
          <input id="firstName" name="firstName" value={formData.firstName.value} onChange={handleChange}></input>
          <span className="error">{formData.firstName.error}</span>

          <label htmlFor='lastName'>Lastname <span>*</span></label>
          <input id="lastName" name="lastName" value={formData.lastName.value} onChange={handleChange}></input>
          <span className="error">{formData.lastName.error}</span>

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

          <button type='submit'>Register</button>
        </form >
      </>
  )
}

const Register = withProtectedFromLogin(RegisterComponent);
export default Register;