import React from 'react';
import classes from '../style/Select.module.scss';

const Select = React.forwardRef(({ children, defaultValue, options }, ref) => (
  <div className={classes.select}>
    <label className={classes.select__label}>{children}</label>
    <select 
      className={classes.select__field}
      ref={ref}
      defaultValue={defaultValue}
    >
      <option></option>
      {
        options && options.map((option, index) => <option value={option.uuid} key={index}>{option.regionName}</option>)
      }
    </select>
  </div>
));

export default Select;
