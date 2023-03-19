import React from 'react';
import css from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/Authentication/auth.thunk';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const handelSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    dispatch(
      logIn({
        email: form.email.value,
        password: form.password.value,
      })
    );
    form.reset();
  };
  return (
    <div className={css.loginPage}>
      <h1>PHONEBOOK</h1>
      <form onSubmit={handelSubmit} autoComplete="off">
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">LOGiN</button>
      </form>
    </div>
  );
};
