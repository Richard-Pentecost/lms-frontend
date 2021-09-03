import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import SettingsSidebar from '../components/SettingsSidebar';
import Profile from './Profile';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';
import FarmList from './FarmList';
import Users from './Users';
import Spinner from '../components/Spinner';
import { fetchUserByUuid, fetchUsers } from '../store/actions/userActions';
import { fetchFarms } from '../store/actions/farmActions';
import classes from '../style/Settings.module.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { uuid } = useSelector(state => state.authState.token);
  const { loading, currentUser } = useSelector(state => state.userState);

  useEffect(() => {
    dispatch(fetchUserByUuid(uuid));
    dispatch(fetchUsers());
    dispatch(fetchFarms());
  }, [dispatch, uuid]);

  let content = <Spinner />;

  if (!loading && currentUser) {
    content = (
      <>
        <div className={classes.settings__sidebar}>
          <SettingsSidebar name={currentUser.name} />
        </div>
        <div className={classes.settings__main}>
          <Switch>
            <Route path={`${path}/profile`} component={Profile} />
            <Route path={`${path}/security`} component={ChangePassword} />
            <Route path={`${path}/create-user`} component={CreateUser} />
            <Route path={`${path}/users`} component={Users} />
            <Route path={`${path}/farms`} component={FarmList} />
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
