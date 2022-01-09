import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveFarms } from '../store/actions/farmActions';
import { fetchRegions } from '../store/actions/regionActions';
import FarmCard from '../components/FarmCard';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import classes from '../style/Home.module.scss';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { farms } = useSelector(state => state.farmState);
  // console.log('**** farms ****');
  // console.log(farms);
  // farms.map((farm) => {
  //   if (farm.region) {
  //     console.log("*******")
  //     console.log(farm.region);
  //   }
  //   return farm
  // })
  useEffect(() => {
    dispatch(fetchActiveFarms());
    dispatch(fetchRegions());
  }, [dispatch]);

  return (
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
  );
};

export default Home;
