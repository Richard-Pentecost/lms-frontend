import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addData, fetchData, clearErrors, clearSuccessFlag } from '../store/actions/dataActions';
import { fetchActiveFarms } from '../store/actions/farmActions';
import DatePicker from 'react-datepicker';
import Alert from '../components/Alert';
import classes from '../style/AddData.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingWrapper from '../components/LoadingWrapper';

const AddData = () => {
  const history = useNavigate()
  const dispatch = useDispatch();
  const { uuid } = useParams();
  
  const { errorMessage, loading: dataLoading, addDataSuccess, data } = useSelector(state => state.dataState);
  const { farms, loading: farmsLoading } = useSelector(state => state.farmState);
  const [date, setDate] = useState(new Date());
  const [defaultCows, setDefaultCows] = useState();
  const [defaultMeterReading, setDefaultMeterReading] = useState();
  const [defaultPumpDial, setDefaultPumpDial] = useState();
  const [defaultWaterUsage, setDefaultWaterUsage] = useState();

  const farm = farms && farms.find(farm => farm.uuid === uuid);

  const noOfCowsRef = useRef();
  const productRef = useRef();
  const quantityRef = useRef();
  const meterReadingRef = useRef();
  const waterUsageRef = useRef();
  const pumpDialRef = useRef();
  const floatBeforeRef = useRef();
  const targetFeedRateRef = useRef();
  const floatAfterRef = useRef();
  const commentsRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {  
      const previousDataWithSameDate = data.find(d => {
        return new Date(d.date).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
      })

      if (previousDataWithSameDate) {
        const { noOfCows, meterReading, pumpDial, waterUsage } = previousDataWithSameDate;
        setDefaultCows(noOfCows);
        setDefaultMeterReading(meterReading);
        setDefaultPumpDial(pumpDial);
        setDefaultWaterUsage(waterUsage);
      } else { 
        setDefaultCows(null);
        setDefaultMeterReading(null);
        setDefaultPumpDial(null);
        setDefaultWaterUsage(null)
      }
    }
  }, [date, data])

  useEffect(() => {
    !farms && dispatch(fetchActiveFarms());
  }, [dispatch, farms]);

  useEffect(() => {
    !data && dispatch(fetchData(uuid));
  }, [dispatch, data, uuid]);

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
    const newData = {
      date: date,
      farmFk: uuid,
      noOfCows: +noOfCowsRef.current.value,
      product: productRef.current.value,
      quantity: +quantityRef.current.value,
      meterReading: +meterReadingRef.current.value,
      waterUsage: +waterUsageRef.current.value,
      pumpDial: +pumpDialRef.current.value,
      floatBeforeDelivery: +floatBeforeRef.current.value,
      targetFeedRate: +targetFeedRateRef.current.value,
      floatAfterDelivery: +floatAfterRef.current.value,
      comments: commentsRef.current.value,
    }

    const previousDataUuids = data
      .filter(d => d.product === productRef.current.value)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB > dateA ? 1 : -1;
      });

    const previousDataUuid = previousDataUuids.length > 0 && previousDataUuids[0].uuid;
    dispatch(addData(newData, previousDataUuid))
  }

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <LoadingWrapper loading={farmsLoading || dataLoading}>
      <div className={classes.formContainer}>
        {
          farm && (
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
                  <select ref={productRef} className={classes.dataInput__input}>
                    <option value='blank'></option>
                    {
                      farm && farm.products.map((product, index) => <option value={product.productName} key={index}>{product.productName}</option>)
                    }
                  </select>
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Number of Cows:</label>
                  <input type='number' ref={noOfCowsRef} className={classes.dataInput__input} defaultValue={defaultCows} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Quantity:</label>
                  <input type='number' step='0.1' ref={quantityRef} className={classes.dataInput__input} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Meter Reading:</label>
                  <input type='number' step='0.1' ref={meterReadingRef} className={classes.dataInput__input} defaultValue={defaultMeterReading} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Water Usage:</label>
                  <input type='number' ref={waterUsageRef} className={classes.dataInput__input} defaultValue={defaultWaterUsage} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Pump Dial:</label>
                  <input type='number' ref={pumpDialRef} className={classes.dataInput__input} defaultValue={defaultPumpDial} />
                </div>
                <div className={classes.dataInput__container}>
                  <label className={classes.dataInput__label}>Float Before Delivery:</label>
                  <input type='number' ref={floatBeforeRef} className={classes.dataInput__input} />
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
            </>
          )
        }
      </div>
    </LoadingWrapper>
  );
};

export default AddData;
