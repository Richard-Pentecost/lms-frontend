import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ exact, path, authenticate, component, ...props }) => {
  const Component = component;
  return (
    <Route 
      {...props}
      exact={exact}
      path={path}
      render={routeProps => (authenticate() ? 
        <Component {...routeProps} {...props} /> :
        <Route path="*" element={<Navigate to="/"/>}/>
      )}
    />
  );
};

export default AuthRoute;
