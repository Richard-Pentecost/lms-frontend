import React from 'react';
import classes from '../style/RadioButton.module.scss';

const RadioButton = React.forwardRef((props, ref) => (
  <div className={classes.radioButton}>
    <label htmlFor='radio-one' className={classes.radioButton__label}>
      LabelOne
    </label>
    <input 
      className={classes.radioButton__input}
      type="radio"
      id="radio-one"
      name={props.name}
      value={props.firstValue}
    />
    <label htmlFor='radio-two' className={classes.radioButton__label}>
      LabelTwo
    </label>
    <input 
      className={classes.radioButton__input}
      type="radio"
      id="radio-two"
      name={props.name}
      value={props.secondValue}
    />
    <label htmlFor='radio-three' className={classes.radioButton__label}>
      LabelThree
    </label>
    <input 
      className={classes.radioButton__input}
      type="radio"
      id="radio-three"
      name={props.name}
      value={props.thirdValue}
    />
  </div>
));

export default RadioButton;
