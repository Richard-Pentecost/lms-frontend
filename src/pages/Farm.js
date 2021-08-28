import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FarmHeading from '../components/FarmHeading';
import Button from '../components/Button'
import Table from '../components/Table';
import classes from '../style/Farm.module.scss';

const Farm = () => {
  const { uuid } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  const farm = useSelector(state => {
    return state.farmState.farms.find(farm => farm.uuid === uuid);
  });

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
