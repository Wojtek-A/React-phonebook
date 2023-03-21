import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'Pages/HomePage/HomePage';
import { RestrictedRoute } from './RestrictedRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { RegisterPage } from 'Pages/RegisterPage/RegisterPage';
import { LoginPage } from 'Pages/LoginPage/LoginPage';
import { PhonebookPage } from 'Pages/PhonebookPage/PhonebookPage';

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/sign-up"
        element={<RestrictedRoute component={<RegisterPage />} />}
      />
      <Route
        path="/log-in"
        element={<RestrictedRoute component={<LoginPage />} />}
      />
      <Route
        path="/phonebook"
        element={
          <ProtectedRoute component={<PhonebookPage />} redirectedTo={'/'} />
        }
      />
    </Routes>
  );
};
