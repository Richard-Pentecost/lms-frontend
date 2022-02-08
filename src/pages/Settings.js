import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { fetchLoggedInUser } from '../store/actions/authActions';
import { fetchUsers } from '../store/actions/userActions';
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
import LoadingWrapper from '../components/LoadingWrapper';

const Settings = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const { token, loggedInUser } = useSelector(state => state.authState);
  const { loading: userLoading } = useSelector(state => state.userState);
  const { loading: productsLoading } = useSelector(state => state.productState);
  const { loading: regionsLoading } = useSelector(state => state.regionState);
  const { loading: farmsLoading } = useSelector(state => state.farmState);

  useEffect(() => {
    dispatch(fetchFarms());
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchRegions())
  }, [dispatch]);

  useEffect(() => {
    !loggedInUser && dispatch(fetchLoggedInUser(token.uuid));
  }, [dispatch, loggedInUser, token.uuid]);
  
  return (
    <LoadingWrapper loading={userLoading || productsLoading || regionsLoading || farmsLoading}>
      { loggedInUser && (
        <div className={classes.settings}>
          <div className={classes.settings__sidebar}>
            <SettingsSidebar name={loggedInUser.name} isAdmin={token.isAdmin} />
          </div>
          <div className={classes.settings__main}>
            <Switch>
              <Route path={`${path}/profile`} component={Profile} />
              <Route path={`${path}/security`} component={ChangePassword} />
              <AdminRoute path={`${path}/create-user`} component={CreateUser} isAdmin={token.isAdmin} />
              <AdminRoute path={`${path}/users`} component={Users} isAdmin={token.isAdmin} />
              <AdminRoute path={`${path}/farms`} component={FarmList} isAdmin={token.isAdmin} />
              <AdminRoute path={`${path}/regions`} component={RegionList} isAdmin={token.isAdmin} />
              <AdminRoute path={`${path}/products`} component={ProductList} isAdmin={token.isAdmin} />
              <Redirect to={`${path}/profile`} />
            </Switch>
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
}

export default Settings;
