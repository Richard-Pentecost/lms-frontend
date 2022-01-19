import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { fetchUserByUuid, fetchUsers } from '../store/actions/userActions';
import { fetchFarms } from '../store/actions/farmActions';
import { fetchRegions } from '../store/actions/regionActions';
import { fetchProducts } from '../store/actions/productActions';
import AdminRoute from '../components/AdminRoute';
import SettingsSidebar from '../components/SettingsSidebar';
import Profile from './Profile';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';
import FarmList from './FarmList';
import Users from './Users';
import Spinner from '../components/Spinner';
import RegionList from './RegionList';
import ProductList from './ProductList';
import classes from '../style/Settings.module.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const { uuid, isAdmin } = useSelector(state => state.authState.token);
  const { loading, currentUser, users } = useSelector(state => state.userState);
  const { products } = useSelector(state => state.productState);
  const { regions } = useSelector(state => state.regionState);

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  useEffect(() => {
    !currentUser && dispatch(fetchUserByUuid(uuid));
  }, [dispatch, currentUser, uuid]);

  useEffect(() => {
    users.length === 0 && dispatch(fetchUsers());
  }, [dispatch, users]);

  useEffect(() => {
    products.length === 0 && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    regions.length === 0 && dispatch(fetchRegions());
  }, [dispatch, regions]);

  let content = <Spinner />;

  if (!loading && currentUser) {
    content = (
      <>
        <div className={classes.settings__sidebar}>
          <SettingsSidebar name={currentUser.name} isAdmin={isAdmin} />
        </div>
        <div className={classes.settings__main}>
          <Switch>
            <Route path={`${path}/profile`} component={Profile} />
            <Route path={`${path}/security`} component={ChangePassword} />
            <AdminRoute path={`${path}/create-user`} component={CreateUser} isAdmin={isAdmin} />
            <AdminRoute path={`${path}/users`} component={Users} isAdmin={isAdmin} />
            <AdminRoute path={`${path}/farms`} component={FarmList} isAdmin={isAdmin} />
            <AdminRoute path={`${path}/regions`} component={RegionList} isAdmin={isAdmin} />
            <AdminRoute path={`${path}/products`} component={ProductList} isAdmin={isAdmin} />
            <Redirect to={`${path}/profile`} />
          </Switch>
        </div>
      </>
    )
  }
  
  return (
    <div className={classes.settings}>
      { content }
    </div>
  );
}

export default Settings;
