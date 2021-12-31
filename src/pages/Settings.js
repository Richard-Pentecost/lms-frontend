import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import AdminRoute from '../components/AdminRoute';
import SettingsSidebar from '../components/SettingsSidebar';
import Profile from './Profile';
import AddRegion from './AddRegion';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';
import FarmList from './FarmList';
import Users from './Users';
import Spinner from '../components/Spinner';
import RegionList from './RegionList';
import { fetchUserByUuid, fetchUsers } from '../store/actions/userActions';
import { fetchFarms } from '../store/actions/farmActions';
import { fetchRegions } from '../store/actions/regionActions';
import classes from '../style/Settings.module.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { uuid } = useSelector(state => state.authState.token);
  const { loading, currentUser } = useSelector(state => state.userState);
  const isAdmin = useSelector(state => state.authState.token.isAdmin);

  useEffect(() => {
    dispatch(fetchUserByUuid(uuid));
    dispatch(fetchUsers());
    dispatch(fetchFarms());
    dispatch(fetchRegions());
  }, [dispatch, uuid]);

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
