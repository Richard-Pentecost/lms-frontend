import { Navigate } from 'react-router-dom';

const AuthRoute = ({ authenticate, children }) => { 
  return authenticate() ? children : <Navigate to='/' replace />;
}

export default AuthRoute;
