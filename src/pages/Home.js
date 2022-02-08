import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveFarms } from '../store/actions/farmActions';
import { fetchRegions } from '../store/actions/regionActions';
import { fetchProducts } from '../store/actions/productActions';
import { fetchLoggedInUser } from '../store/actions/authActions';
import FarmCard from '../components/FarmCard';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import classes from '../style/Home.module.scss';
import LoadingWrapper from '../components/LoadingWrapper';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loggedInUser, token, loading: userLoading } = useSelector(state => state.authState);
  const { farms, loading: farmsLoading } = useSelector(state => state.farmState);

  useEffect(() => {
    dispatch(fetchActiveFarms());
  }, [dispatch]);

  useEffect(() => {
    !loggedInUser && dispatch(fetchLoggedInUser(token.uuid));
  }, [dispatch, loggedInUser, token]);

  return (
    <LoadingWrapper loading={farmsLoading || userLoading}>
      <div className={classes.home}>
        {/* <div className={classes.homeSidebar}>
          <Sidebar />
        </div> */}
        <div className={classes.homeBody}>
          <div className={classes.header}>
            <div className={classes.header__sort}></div>
            <div className={classes.header__search}>
              <SearchBar />
            </div>
            <div className={classes.header__btn}>
              <Button
                handleClick={() => history.push('/farms/create-farm')}
                icon='plus'
              >
                Create Farm
              </Button>
            </div>
          </div>
          <div className={classes.farmList}>
            {
              farms && farms.map(farm => (
                <div className={classes.farmList__card} key={farm.uuid}>
                  <FarmCard farm={farm} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Home;
