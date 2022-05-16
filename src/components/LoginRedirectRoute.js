import { Navigate } from 'react-router-dom';

const LoginRedirectRoute = ({ authenticate, children }) => {
  return !authenticate() ? children : <Navigate to='/home' replace />;
}

export default LoginRedirectRoute;
