import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ exact, path, isAdmin, component, ...props }) => {
  const Component = component;
  return (
    <Route 
      {...props}
      exact={exact}
      path={path}
      render={routeProps => isAdmin ?
        <Component {...routeProps} {...props} isAdmin={isAdmin} /> :
        <Redirect to='/' />
      }
    />
  )
}

export default AdminRoute;
