import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ path, isAdmin, component, ...props }) => {
  const Component = component;
  return (
    <Route 
      {...props}
      path={path}
      render={routeProps => isAdmin ?
        <Component {...routeProps} {...props} isAdmin={isAdmin} /> :
        <Redirect to='/' />
      }
    />
  )
}

export default AdminRoute;
