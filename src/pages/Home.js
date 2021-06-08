import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from '../style/Home.module.scss';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Home = () => {

  useEffect(() => {
    let farms;
    const getFarms = async () => {
      farms = await axios.get(`${API_URL}/farms`);
    };
    getFarms();
    console.log(farms);
  }, []);

  return (
    <div className={classes.home}>
      <Link to='/settings/create-user'>Create User</Link>   
      <Link to='/create-farm'>Create Farm</Link>
    </div>
  );
};

export default Home;
