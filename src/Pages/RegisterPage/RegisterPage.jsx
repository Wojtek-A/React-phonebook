import React, { useState } from "react";
import css from './RegisterPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from 'redux/Authentication/AuthenticationThunk';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import StrengthMeter from "components/StrengthMeter/StrengthMeter";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [isError, setError] = useState(null);

  const onChange = (event) => {
    let password = event.target.value;
    initValue({
      ...pwdInput,
      password: event.target.value,
    });
    setError(null);
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setError(
        "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      return;
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
  };
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

  const handelSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.name.length < 3) {
      Notify.failure(`Username must have more than three characters`);
      return true;
    }
    dispatch(
      signUp({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className={css.registerPage}>
      <h1>PHONEBOOK</h1>
      <form onSubmit={handelSubmit} autoComplete="off">
        <label>
          Username:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" id="password" name="password" onChange={onChange} required />
        </label>
        <div className={css.passwordValidation}>
            {isError !== null && <p className={css.errorText}>{isError}</p>}
            <StrengthMeter password={pwdInput.password} actions={initPwdInput}/>
          </div>
        {isStrong === "strong" && <button type="submit"> SiGN UP </button>}
        <button onClick={() => navigate('/phonebook')}>BACK</button>
      </form>
    </div>
  );
};
