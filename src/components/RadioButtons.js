import classes from '../style/RadioButtons.module.scss';

const RadioButtons = ({ firstLabel, firstValue, secondLabel, secondValue, input, handleChange }) => (
  <div className={classes.radioButton}>
    <input 
      className={classes.radioButton__input}
      type="radio"
      id="radio-one"
      value={firstValue}
      checked={input === firstValue}
      onChange={handleChange}
    />
    <label htmlFor='radio-one' className={classes.radioButton__label}>
      { firstLabel }
    </label>
    <input 
      className={classes.radioButton__input}
      type="radio"
      id="radio-two"
      value={secondValue}
      checked={input === secondValue}
      onChange={handleChange}
    />
    <label htmlFor='radio-two' className={classes.radioButton__label}>
      { secondLabel }
    </label>
  </div>
);

export default RadioButtons;
