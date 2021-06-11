import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateFarm from './pages/CreateFarm';
import EditFarm from './pages/EditFarm';
import CreateUser from './pages/CreateUser';
import Farm from './pages/Farm';
import AuthRoute from './components/AuthRoute';
import Layout from './components/Layout';
import { isTokenValid } from './utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare, faPlus, faSearch, faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import './style/App.module.scss';

library.add(faAddressCard, faUser, faPhoneSquare, faEdit, faPlus, faSearch, faTrashAlt, faCalendarAlt, faCaretDown, faSpinner);

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
            path='/farms/create-farm'
            component={CreateFarm}
            authenticate={isLoggedIn}
          />
          <AuthRoute
            exact
            path='/farms/:id'
            component={Farm}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            exact
            path='/farms/:id/edit-farm'
            component={EditFarm}
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
