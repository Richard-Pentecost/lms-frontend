import { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addData, clearErrors, clearSuccessFlag } from '../store/actions/dataActions';
import DatePicker from 'react-datepicker';
import Alert from '../components/Alert';
import classes from '../style/AddData.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const AddData = () => {
  const [date, setDate] = useState(new Date());
  const history = useHistory()
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const { errorMessage, loading, addDataSuccess } = useSelector(state => state.dataState);

  const noOfCowsRef = useRef();
  const productRef = useRef();
  const quantityRef = useRef();
  const meterReadingRef = useRef();
  const waterUsageRef = useRef();
  const pumpDialRef = useRef();
  const floatBeforeRef = useRef();
  const kgActualRef = useRef();
  const targetFeedRateRef = useRef();
  const floatAfterRef = useRef();
  const commentsRef = useRef();

  useEffect(() => {
    if (addDataSuccess) {
      history.goBack();
    }
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, history, addDataSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const data = {
      date: date,
      farmFk: uuid,
      noOfCows: parseInt(noOfCowsRef.current.value),
      product: productRef.current.value,
      quantity: parseInt(quantityRef.current.value),
      meterReading: parseInt(meterReadingRef.current.value),
      waterUsage: parseInt(waterUsageRef.current.value),
      pumpDial: parseInt(pumpDialRef.current.value),
      floatBeforeDelivery: parseInt(floatBeforeRef.current.value),
      kgActual: parseInt(kgActualRef.current.value),
      targetFeedRate: parseInt(targetFeedRateRef.current.value),
      floatAfterDelivery: parseInt(floatBeforeRef.current.value),
      comments: commentsRef.current.value,
    }
    dispatch(addData(data))
  }

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.dataForm} onSubmit={handleSubmit}>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Date:</label>
            <DatePicker 
              selected={date}
              dateFormat='dd/MM/yyyy'
              onChange={date => setDate(date)}
              className={classes.dataInput__input}
            />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Number of Cows:</label>
            <input type='number' ref={noOfCowsRef} className={classes.dataInput__input} />
          </div>
          <div className={classes.dataInput__container}>
            <label className={classes.dataInput__label}>Product:</label>
            <select ref={productRef} className={classes.dataInput__input}>
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
      </form>
      { errorMessage && <Alert>{errorMessage}</Alert>}
    </div>
  );
};

export default AddData;
