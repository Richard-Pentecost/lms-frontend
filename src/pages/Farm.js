import { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FarmHeading from '../components/FarmHeading';
import Button from '../components/Button'
import Table from '../components/Table';
import classes from '../style/Farm.module.scss';

const Farm = () => {
  const { uuid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  
  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));
  console.log(farm)

  return (
    <div className={classes.farm}>
      <FarmHeading farm={farm} />
      <Button 
        handleClick={() => history.push(`${pathname}/add-data`)}
      >Add Data</Button>
      <Table />
    </div>
  );
}

export default Farm;
