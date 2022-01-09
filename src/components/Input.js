import React from 'react';
import classes from '../style/Input.module.scss';

const Input = React.forwardRef(({ children, type, defaultValue, disabled, step }, ref) => (
  <div className={classes.input}>
    <label className={classes.input__label}>{children}</label>
    <input 
      data-testid='input'
      disabled={disabled}
      className={classes.input__field}
      type={type}
      ref={ref}
      step={step}
      defaultValue={defaultValue}
    />
  </div>
));

export default Input;
