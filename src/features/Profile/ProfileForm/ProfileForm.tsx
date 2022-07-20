import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../App';
import { updateEmployee, updateStudent } from '../../../app/api/user.api';
import FormArray from '../../../app/components/FormArray/FormArray';
import { useAppDispatch, useAppSelector } from '../../../app/hook/store.hook';
import { refresh, selectAuth } from '../../../app/store/auth/authSlice';
import { Gender } from '../../../app/utils/enum/Gender.enum';
import { UserRole } from '../../../app/utils/enum/UserRole.enum';
import { arrayLength, notEmpty, stringLength, validate, validator } from '../../../app/utils/validators/validators';

const STUDENT = "STUDENT";
const EMPLOYEE = "EMPLOYEE";

export default function ProfileForm() {

  const { user, role } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setValue } = useContext(ModalContext);

  const [profileType, setProfileType] = useState('');
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    login: {
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
    // employee
    phoneNumbers: {
      value: Array<string>(0),
      error: ""
    },
    // student
    gender: {
      value: '',
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
  })

  useEffect(() => {
    setFormData(prev => {
      const newData = { ...prev };
      if (role) {
        newData.login.value = user.login;
        newData.firstName.value = user.firstname;
        newData.lastName.value = user.lastname;
        if (+UserRole[role] === UserRole.DIRECTOR || +UserRole[role] === UserRole.INSTRUCTOR) {
          newData.phoneNumbers.value = user.employee?.phoneNumers || [];
          setProfileType(EMPLOYEE);
        }
        if (+UserRole[role] === UserRole.STUDENT) {
          newData.gender.value = (user.student?.gender && +Gender[user.student.gender] + "") || '';
          newData.email.value = user.student?.email || '';
          setProfileType(STUDENT);
        }
      }
      return newData;
    })
  }, [user, role]);

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
    firstName: [
      validator(setError("firstName", "Firstname length min 3 chars"))(stringLength(3, 30)),
      validator(setError("firstName", "Firstname is required"))(notEmpty),
    ],
    lastName: [
      validator(setError("lastName", "Lastname length min 3 chars"))(stringLength(3, 30)),
      validator(setError("lastName", "Lastname is required"))(notEmpty),
    ],
  });

  const [formDataValidatorsEmployee] = useState({
    phoneNumbers: [
      validator(setError("phoneNumbers", "Phones length min 1"))(arrayLength(1)),
    ]
  });

  const [formDataValidatorsStudent] = useState({
    gender: [
      validator(setError("gender", "Gender is required"))(notEmpty),
    ]
  });

  const handleNewPhoneNumbers = (newPhones: string[]) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.phoneNumbers = {
        value: newPhones,
        error: ''
      }
      return newData;
    })
  }

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
    if (role) {
      let validatorRules = { ...formDataValidators };
      if (profileType === EMPLOYEE) {
        validatorRules = Object.assign(validatorRules, formDataValidatorsEmployee);
        if (validate(formData, validatorRules)) {
          const employeeData = {
            login: formData.login.value,
            firstname: formData.firstName.value,
            lastname: formData.lastName.value,
            phoneNumers: formData.phoneNumbers.value,
          }
          updateEmployee(user.id, employeeData)
            .then(data => {
              if (data.data.status === 200) {
                navigate("/profile");
                setValue("Profile data was edited");
                dispatch(refresh())
              }
              if (data.data.status === 501) {
                setFormData(prev => {
                  return {
                    ...prev,
                    login: {
                      ...prev.login,
                      error: "Login is not unique"
                    }
                  }
                });
              }
              if (data.data.status === 500) {
                setMessage("Cannot update user profile");
              }
            })
            .catch(err => {
              setMessage("Cannot update user profile");
            })
        }

      }
      if (profileType === STUDENT) {
        validatorRules = Object.assign(validatorRules, formDataValidatorsStudent);
        if (validate(formData, validatorRules)) {
          const studentData = {
            login: formData.login.value,
            firstname: formData.firstName.value,
            lastname: formData.lastName.value,
            email: formData.email.value ? formData.email.value : null,
            gender: formData.gender.value
          }
          updateStudent(user.id, studentData)
            .then(data => {
              if (data.data.status === 200) {
                navigate("/profile");
                setValue("Profile data was edited");
                dispatch(refresh())
              }
              if (data.data.status === 501) {
                setFormData(prev => {
                  return {
                    ...prev,
                    login: {
                      ...prev.login,
                      error: "Login is not unique"
                    }
                  }
                });
              }
              if (data.data.status === 500) {
                setMessage("Cannot update user profile");
              }
            })
            .catch(err => {
              setMessage("Cannot update user profile");
            })
        }
      }
    }


  };


  return (
    <form className='form form-edit-password' onSubmit={handleSubmit}>
      <span className="main-error" style={{ marginTop: "10px" }}>
        {message}
      </span>



      <label htmlFor='login'>Login <span>*</span></label>
      <input id="login" name="login" value={formData.login.value} onChange={handleChange}></input>
      <span className="error">{formData.login.error}</span>

      <label htmlFor='firstName'>Firstname <span>*</span></label>
      <input id="firstName" name="firstName" value={formData.firstName.value} onChange={handleChange}></input>
      <span className="error">{formData.firstName.error}</span>

      <label htmlFor='lastName'>Lastname <span>*</span></label>
      <input id="lastName" name="lastName" value={formData.lastName.value} onChange={handleChange}></input>
      <span className="error">{formData.lastName.error}</span>

      {
        profileType === EMPLOYEE ?
          <>
            <FormArray labelText="Phones" formData={formData.phoneNumbers.value} setFormData={handleNewPhoneNumbers} />
            <span className="error">{formData.phoneNumbers.error}</span>
          </>
          :
          null
      }
      {
        profileType === STUDENT ?
          <>
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
          </>
          :
          null
      }



      <button type='submit'>Submit</button>
    </form>
  )
}
