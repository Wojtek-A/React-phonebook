import React from 'react';
import css from './UserMenu.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hook/useAuth/useAuth';
import { signOut } from 'redux/Authentication/auth.thunk';
import LogoutIcon from '@mui/icons-material/Logout';
import { Filter } from 'components/Filter/Filter';

export const UserMenu = () => {
  const { isAuthorized } = useAuth();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const user = JSON.parse(localStorage.getItem('persist:auth'));
  const mail = JSON.parse(user.user);

  return (
    <div className={css.userMenu}>
      <h1>PHONEBOOK</h1>
      <Filter />
      <div className={css.user}>
        <p>USER: {mail.email}</p>
        {isAuthorized && (
          <>
            <Link to="/">
              <button onClick={handleSignOut}>
                <LogoutIcon />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
