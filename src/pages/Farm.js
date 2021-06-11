import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FarmHeading from '../components/FarmHeading';
import classes from '../style/Farm.module.scss';

const Farm = () => {
  const { id } = useParams();

  const farm = useSelector(state => {
    return state.farmState.farms.find(farm => farm.id === +id);
  });

  return (
    <div className={classes.farm}>
      <FarmHeading farm={farm} />
    </div>
  );
}

export default Farm;
