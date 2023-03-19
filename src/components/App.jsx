import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoaderSpinner } from './Loader/Loader';
import { Navigation } from './Navigation';
import { refreshUser } from 'redux/Authentication/auth.thunk';
import { useAuth } from 'hook/useAuth/useAuth';

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? <LoaderSpinner /> : <Navigation />;
};
