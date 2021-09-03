import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import Button from '../components/Button';
import classes from '../style/AddData.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const AddData = () => {
  const [startDate, setStartDate] = useState(new Date());

  const noOfCowsRef = useRef();
  const quantityRef = useRef();
  const meterReadingRef = useRef();
  const waterUsageRef = useRef();
  const pumpDialRef = useRef();
  const floatBeforeRef = useRef();
  const kgActualRef = useRef();
  const targetFeedRateRef = useRef();
  const floatAfterRef = useRef();
  const commentsRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted form');
  }

  const handleCancel = () => {
    console.log('Cancelled');
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.dataForm} onSubmit={handleSubmit}>
        {/* <div className={classes.dataInput}> */}
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Date:</label>
            <DatePicker 
              selected={startDate}
              dateFormat='dd/MM/yyyy'
              onChange={date => setStartDate(date)}
              className={classes.dataInput__input}
            />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Number of Cows:</label>
            <input type='number' ref={noOfCowsRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Product:</label>
            <select className={classes.dataInput__input}>
              <option value='blank'></option>
              <option value='Acid'>Acid</option>
              <option value='Chlorine'>Chlorine</option>
            </select>
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Quantity:</label>
            <input type='number' ref={quantityRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Meter Reading:</label>
            <input type='number' ref={meterReadingRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Water Usage:</label>
            <input type='number' ref={waterUsageRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Pump Dial:</label>
            <input type='number' ref={pumpDialRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Float Before Delivery:</label>
            <input type='number' ref={floatBeforeRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>kg Actual:</label>
            <input type='number' ref={kgActualRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Target Feed Rate:</label>
            <input type='number' ref={targetFeedRateRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Float After Delivery:</label>
            <input type='number' ref={floatAfterRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Comments:</label>
            <textarea className={classes.dataInput__comments} rows='3' ref={commentsRef} />
          </div>
          <div className={classes.btnContainer}>
            <button 
              type='submit' 
              className={`${classes.addDataBtn} ${classes.btn}`}
            >Add Data</button>
            <button
              type='button' 
              onClick={handleCancel}
              className={`${classes.cancelBtn} ${classes.btn}`}
            >Cancel</button>
          </div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default AddData;
