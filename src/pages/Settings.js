import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchLoggedInUser } from '../store/actions/authActions';
import { fetchUsers } from '../store/actions/userActions';
import { fetchFarms } from '../store/actions/farmActions';
import { fetchRegions } from '../store/actions/regionActions';
import { fetchProducts } from '../store/actions/productActions';
import SettingsSidebar from '../components/SettingsSidebar';
import classes from '../style/Settings.module.scss';
import LoadingWrapper from '../components/LoadingWrapper';

const Settings = () => {
  const dispatch = useDispatch();
  const { token, loggedInUser } = useSelector(state => state.authState);
  const { users, loading: userLoading } = useSelector(state => state.userState);
  const { products, loading: productsLoading } = useSelector(state => state.productState);
  const { regions, loading: regionsLoading } = useSelector(state => state.regionState);
  const { allFarms, loading: farmsLoading } = useSelector(state => state.farmState);

  useEffect(() => {
    !allFarms && dispatch(fetchFarms());
  }, [dispatch, allFarms, token]);

  useEffect(() => {
    !users && token.isAdmin && dispatch(fetchUsers());
  }, [dispatch, users, token]);

  useEffect(() => {
    !products && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    !regions && dispatch(fetchRegions());
  }, [dispatch, regions]);

  useEffect(() => {
    !loggedInUser && dispatch(fetchLoggedInUser(token.uuid));
  }, [dispatch, loggedInUser, token]);
  
  return (
    <LoadingWrapper loading={userLoading || productsLoading || regionsLoading || farmsLoading}>
      { loggedInUser && (
        <div className={classes.settings}>
          <div className={classes.settings__sidebar}>
            <SettingsSidebar name={loggedInUser.name} isAdmin={token.isAdmin} />
          </div>
          <div className={classes.settings__main}>
            <Outlet />
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
}

export default Settings;
