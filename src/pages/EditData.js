import { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editData, clearErrors, clearSuccessFlag, fetchData } from '../store/actions/dataActions';
import { fetchActiveFarms } from '../store/actions/farmActions';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import Alert from '../components/Alert';
import classes from '../style/AddData.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const EditData = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { uuid, dataId } = useParams();

  const [date, setDate] = useState();
  const data = useSelector(state => state.dataState.data.find(data => data.uuid === dataId));
  const { errorMessage, loading, addDataSuccess } = useSelector(state => state.dataState);
  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));

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
    if (!data) {
      dispatch(fetchData(uuid));
    }
    
    if (data) {
      setDate(new Date(data.date));
    }
  }, [dispatch, data, uuid]);

  useEffect(() => {
    !farm && dispatch(fetchActiveFarms());
  }, [dispatch, farm]);

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
      floatAfterDelivery: parseInt(floatAfterRef.current.value),
      comments: commentsRef.current.value,
    }
    dispatch(editData(data, dataId))
  }

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className={classes.formContainer}>
      {
        data && (
          <>
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
                  <label className={classes.dataInput__label}>Product:</label>
                  <select ref={productRef}  defaultValue={data.product} className={classes.dataInput__input}>
                    <option value='blank'></option>
                    {
                      farm.products.map((product, index) => <option value={product.productName} key={index}>{product.productName}</option>)
                    }
                  </select>
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Number of Cows:</label>
                  <input type='number' ref={noOfCowsRef} defaultValue={data.noOfCows} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Quantity:</label>
                  <input type='number' ref={quantityRef} defaultValue={data.quantity}className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Meter Reading:</label>
                  <input type='number' ref={meterReadingRef} defaultValue={data.meterReading} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Water Usage:</label>
                  <input type='number' ref={waterUsageRef} defaultValue={data.waterUsage} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Pump Dial:</label>
                  <input type='number' ref={pumpDialRef} defaultValue={data.pumpDial} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Float Before Delivery:</label>
                  <input type='number' ref={floatBeforeRef} defaultValue={data.floatBeforeDelivery} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>kg Actual:</label>
                  <input type='number' ref={kgActualRef} defaultValue={data.kgActual} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Target Feed Rate:</label>
                  <input type='number' ref={targetFeedRateRef} defaultValue={data.targetFeedRate} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Float After Delivery:</label>
                  <input type='number' ref={floatAfterRef} defaultValue={data.floatAfterDelivery} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Comments:</label>
                  <textarea className={classes.dataInput__comments} rows='3' ref={commentsRef} defaultValue={data.comments} />
                </div>
                <div className={classes.btnContainer}>
                  <button 
                    type='submit' 
                    className={`${classes.addDataBtn} ${classes.btn}`}
                  >Save Data</button>
                  <button
                    type='button' 
                    onClick={handleCancel}
                    className={`${classes.cancelBtn} ${classes.btn}`}
                  >Cancel</button>
                </div>
            </form>
            { errorMessage && <Alert>{errorMessage}</Alert>}
          </>
        )
      }
    </div>
  );
};

export default EditData;
