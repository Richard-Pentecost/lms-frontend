import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { counterActions } from '../store/';
import classes from '../style/Home.module.scss';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Home = () => {

  // useEffect(() => {
  //   let farms;
  //   const getFarms = async () => {
  //     farms = await axios.get(`${API_URL}/farms`);
  //   };
  //   getFarms();
  //   console.log(farms);
  // }, []);
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: 'increment' });
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    // dispatch({ type: 'decrement' });\
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    // dispatch({ type: 'increase', payload: 5 });
    dispatch(counterActions.increase(5));
  }

  const toggleCounterHandler = () => {
    // dispatch({ type: 'toggle' });
    dispatch(counterActions.toggleCounter());
  };

  return (
    <div className={classes.home}>
      {/* <Link to='/settings/create-user'>Create User</Link>   
      <Link to='/create-farm'>Create Farm</Link> */}
      <h1>Redux Counter</h1>
      { show && <div>{counter}</div> }
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </div>
  );
};

export default Home;
