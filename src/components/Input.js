import React from 'react';
import classes from '../style/Input.module.scss';

const Input = React.forwardRef(
  ({ children, type }, ref) => {
    return (
      <div className={classes.input}>
        <label className={classes.input__label}>{children}</label>
        <input 
          className={classes.input__field}
          type={type}
          ref={ref}
        />
      </div>
    )
  }
)

export default Input;
