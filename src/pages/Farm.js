import { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FarmHeading from '../components/FarmHeading';
import Button from '../components/Button'
import DataTable from '../components/DataTable';
import classes from '../style/Farm.module.scss';
import { fetchData } from '../store/actions/dataActions';

const Farm = () => {
  const { uuid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));
  const { data } = useSelector(state => state.dataState);

  useEffect(() => {
    dispatch(fetchData(uuid));
  }, [dispatch, uuid]);

  const handleRowClick = () => {
    console.log("clicked!");
  };

  return (
    <div className={classes.farm}>
      <FarmHeading farm={farm} />
      { 
        data.length === 0 ? 
          <p>No data found</p> :
          data.map(d => {
            return <p>{d.date}</p>
          })
      }
      <Button 
        handleClick={() => history.push(`${pathname}/add-data`)}
      >Add Data</Button>
      <DataTable data={data} clickHandler={handleRowClick} />
    </div>
  );
}

export default Farm;
