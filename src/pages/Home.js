import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../style/Home.module.scss';

const Home = () => {
  return (
    <div className={classes.home}>
      <Link to='/settings/create-user'>Create User</Link>    
    </div>
  );
};

export default Home;
