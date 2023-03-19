import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from 'redux/Authentication/auth.selector';

export const useAuth = () => {
  const isAuthorized = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  return {
    isAuthorized,
    isRefreshing,
  };
};
