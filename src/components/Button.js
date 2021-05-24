import React from 'react';
import classes from '../style/Button.module.scss';

const Button = ({ children, type }) => {
  return (
    <div className={classes.button}>
      <button type={type} className={classes.button__btn}>{children}</button>
    </div>
  )
}

export default Button;
