import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchFarms } from '../store/actions/farmActions';
import FarmCard from '../components/FarmCard';
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
      <div>
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
  );
};

export default Home;
