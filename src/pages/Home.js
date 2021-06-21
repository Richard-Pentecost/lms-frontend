import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFarms } from '../store/actions/farmActions';
import FarmCard from '../components/FarmCard';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import classes from '../style/Home.module.scss';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { farms } = useSelector(state => state.farmState);

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  return (
    <div className={classes.home}>
      <div className={classes.homeSidebar}>
        <Sidebar />
      </div>
      <div className={classes.homeBody}>
        <div className={classes.homeBody__header}>
          <Button
            handleClick={() => history.push('/farms/create-farm')}
            icon='plus'
          >
            Create Farm
          </Button>
        </div>
        <div className={classes.farmList}>
          {
            farms && farms.map(farm => (
              <div className={classes.farmList__card} key={farm.id}>
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
