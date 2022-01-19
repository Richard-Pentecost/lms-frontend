import React from 'react';
import classes from '../style/RadioButtons.module.scss';

const RadioButtons = ({ labels, input, handleChange }) => (
  <div className={classes.radioButton}>
    { 
      labels.map((label, index) => (
        <React.Fragment key={label}>
          <input 
            className={classes.radioButton__input}
            type="radio"
            id={`radio-${index}`}
            value={label}
            checked={input === label}
            onChange={handleChange}
          />
          <label htmlFor={`radio-${index}`} className={classes.radioButton__label}>
            { label }
          </label>
        </React.Fragment>
      )) 
    }
  </div>
);


export default RadioButtons;
