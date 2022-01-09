import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateFarm from './pages/CreateFarm';
import EditFarm from './pages/EditFarm';
import Settings from './pages/Settings';
import Farm from './pages/Farm';
import AddData from './pages/AddData';
import EditData from './pages/EditData';
import AddRegion from './pages/AddRegion';
import AddProduct from './pages/AddProduct';
import AuthRoute from './components/AuthRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import { isTokenValid } from './utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare, faPlus, faSearch, faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import './style/App.module.scss';

library.add(faAddressCard, faUser, faPhoneSquare, faEdit, faPlus, faSearch, faTrashAlt, faCalendarAlt, faCaretDown, faSpinner);

const App = () => {
  const { token } = useSelector(state => state.authState);

  const isLoggedIn = () => {
    return Boolean(token) && isTokenValid();
  };

  return (
    <>
      <Layout>
        <Switch>
          <Route 
            exact
            path='/'
            render={props => (isLoggedIn() ?
              <Redirect to='/home' /> :
              <Login { ...props }/>  
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
            path='/farms/:uuid'
            component={Farm}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            exact
            path='/farms/:uuid/edit-farm'
            component={EditFarm}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            exact
            path='/farms/:uuid/add-data'
            component={AddData}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            exact
            path='/farms/:uuid/edit-data/:dataId'
            component={EditData}
            authenticate={isLoggedIn}
          />
          <AuthRoute 
            path='/settings'
            component={Settings}
            authenticate={isLoggedIn}
          />
          <AdminRoute 
            path='/create-region'
            component={AddRegion}
            isAdmin={token && token.isAdmin}
          />
          <AdminRoute  
            path='/edit-region/:uuid'
            component={AddRegion} 
            isAdmin={token && token.isAdmin}
          />
          <AdminRoute 
            path='/create-product'
            component={AddProduct}
            isAdmin={token && token.isAdmin}
          />
          <Redirect to='/' />
        </Switch>
      </Layout>   
    </>
  );
};

export default App;
