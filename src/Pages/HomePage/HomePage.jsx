import React from 'react';
import css from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hook/useAuth/useAuth';
import { signOut } from 'redux/Authentication/AuthenticationThunk';

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className={css.homePage}>
      <h1>PHONEBOOK</h1>
      {isAuthorized ? (
        <>
          <button onClick={() => navigate('/phonebook')}>CONTACTS</button>
          <button onClick={handleSignOut}>SiG OUT</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/log-in')}>LOGiN</button>
          <button onClick={() => navigate('/sign-up')}>SiGN UP</button>
        </>
      )}
    </div>
  );
};
