import { Route, Routes, Navigate } from 'react-router-dom';
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
import LoginRedirectRoute from './components/LoginRedirectRoute';
import { isTokenValid } from './utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare, faPlus, faSearch, faCaretDown, faSpinner, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import './style/App.module.scss';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import FarmList from './pages/FarmList';
import RegionList from './pages/RegionList';
import ProductList from './pages/ProductList';

library.add(
  faAddressCard, 
  faUser, 
  faPhoneSquare, 
  faEdit, 
  faPlus, 
  faSearch, 
  faTrashAlt, 
  faCalendarAlt, 
  faCaretDown, 
  faSpinner, 
  faTimesCircle,
  faChevronDown,
  faChevronUp,
);

const App = () => {
  const { token } = useSelector(state => state.authState);

  const isLoggedIn = () => {
    return Boolean(token) && isTokenValid();
  };

  return (
    <>
      <Layout>
        <Routes>
          <Route 
            path='/'
            element={
              <LoginRedirectRoute authenticate={isLoggedIn}><Login /></LoginRedirectRoute> 
            }
          />
          <Route 
            path="/home"
            element={
              <AuthRoute authenticate={isLoggedIn}><Home /></AuthRoute>
            }
          />
          <Route
            path='/farms/create-farm'
            element={
              <AuthRoute authenticate={isLoggedIn}><CreateFarm /></AuthRoute>
            }
          />
          <Route
            path='/farms/:uuid'
            element={
              <AuthRoute authenticate={isLoggedIn}><Farm /></AuthRoute>
            }
          />
          <Route 
            path='/farms/:uuid/edit-farm'
            element={
              <AuthRoute authenticate={isLoggedIn}><EditFarm /></AuthRoute>
            }
          />
          <Route 
            path='/farms/:uuid/add-data'
            element={
              <AuthRoute authenticate={isLoggedIn}><AddData /></AuthRoute>
            }
          />
          <Route 
            path='/farms/:uuid/edit-data/:dataId'
            element={
              <AuthRoute authenticate={isLoggedIn}><EditData /></AuthRoute>
            }
          />
          <Route 
            path='/settings'
            element={
              <AuthRoute authenticate={isLoggedIn}><Settings /></AuthRoute>
            }
          >
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<ChangePassword />} />
            <Route path='create-user' element={<AdminRoute isAdmin={token && token.isAdmin}><CreateUser /></AdminRoute>} />
            <Route path='users' element={<AdminRoute isAdmin={token && token.isAdmin}><Users /></AdminRoute>} />
            <Route path='farms' element={<AdminRoute isAdmin={token && token.isAdmin}><FarmList /></AdminRoute>} />
            <Route path='regions' element={<AdminRoute isAdmin={token && token.isAdmin}><RegionList /></AdminRoute>} />
            <Route path='products' element={<AdminRoute isAdmin={token && token.isAdmin}><ProductList /></AdminRoute>} />
            <Route path='' element={<Navigate to='profile' />} />
          </Route>
          <Route 
            path='/create-region'
            element={
              <AdminRoute isAdmin={token && token.isAdmin}><AddRegion /></AdminRoute>
            }
          />
          <Route 
            path='/edit-region/:uuid'
            element={
              <AdminRoute isAdmin={token && token.isAdmin}><AddRegion /></AdminRoute>
            }
          />
          <Route 
            path='/create-product'
            element={
              <AdminRoute isAdmin={token && token.isAdmin}><AddProduct /></AdminRoute>
            }
          />
          <Route 
            path='/edit-product/:uuid'
            element={
              <AdminRoute isAdmin={token && token.isAdmin}><AddProduct /></AdminRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Layout>   
    </>
  );
};

export default App;
