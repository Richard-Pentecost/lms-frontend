import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateFarm from './pages/CreateFarm';
import CreateUser from './pages/CreateUser';
import AuthRoute from './components/AuthRoute';
import Layout from './components/Layout';
import { isTokenValid } from './utils/token-manager';
import './style/App.module.scss';

const App = props => {
  const [token, setToken] = useState(false);
  
  const isLoggedIn = () => {
    return Boolean(token);
    // return Boolean(props.token) && isTokenValid();
  };

  return (
    <>
      <Layout token={token} setToken={setToken} >
        <Switch>
          <Route 
            exact
            path='/'
            render={props => (isLoggedIn() ?
              <Redirect to='/home' /> :
              <Login {...props} setToken={setToken} />  
            )}
          />
          <AuthRoute 
            exact
            path='/home'
            component={Home}
            authenticate={isLoggedIn}
          />
          <AuthRoute
            exact
            path='/create-farm'
            component={CreateFarm}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            exact
            path='/settings/create-user'
            component={CreateUser}
            authenticate={isLoggedIn}
          />
        </Switch>
      </Layout>   
    </>
  );
};

export default App;
