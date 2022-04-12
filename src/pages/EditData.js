import { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editData, clearErrors, clearSuccessFlag, fetchData } from '../store/actions/dataActions';
import { fetchActiveFarms } from '../store/actions/farmActions';
import DatePicker from 'react-datepicker';
import Alert from '../components/Alert';
import LoadingWrapper from '../components/LoadingWrapper';
import classes from '../style/AddData.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const EditData = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { uuid, dataId } = useParams();

  const { errorMessage, loading: dataLoading, addDataSuccess, data: farmData } = useSelector(state => state.dataState);
  const { farms, loading: farmsLoading } = useSelector(state => state.farmState);
  const [date, setDate] = useState();

  const data = farmData && farmData.find(data => data.uuid === dataId);
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
    farmData ? setDate(new Date(data.date)) : dispatch(fetchData(uuid));
  }, [dispatch, farmData, data, uuid]);

  useEffect(() => {
    !farms && dispatch(fetchActiveFarms());
  }, [dispatch, farms]);
  
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

    const previousData = farmData
      .filter(d => d.product === productRef.current.value)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB > dateA ? 1 : -1;
      });
    
    let previousDataUuid;

    if (previousData.length > 0) {
      const index = previousData.findIndex(data => data.uuid === dataId);
      previousDataUuid = index < previousData.length - 1 && previousData[index + 1].uuid;
    } 
    dispatch(editData(data, dataId, previousDataUuid));
  }

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <LoadingWrapper loading={farmsLoading || dataLoading}>
      <div className={classes.formContainer}>
        {
          data && farm && (
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
                        farm && farm.products.map((product, index) => <option value={product.productName} key={index}>{product.productName}</option>)
                      }
                    </select>
                  </div>
                  <div className={classes.dataInput__container}>
                    <label className={classes.dataInput__label}>Number of Cows:</label>
                    <input type='number' ref={noOfCowsRef} defaultValue={data.noOfCows} className={classes.dataInput__input} />
                  </div>
                  <div className={classes.dataInput__container}>
                    <label className={classes.dataInput__label}>Quantity:</label>
                    <input type='number' step='0.1' ref={quantityRef} defaultValue={data.quantity}className={classes.dataInput__input} />
                  </div>
                  <div className={classes.dataInput__container}>
                    <label className={classes.dataInput__label}>Meter Reading:</label>
                    <input type='number' step='0.1' ref={meterReadingRef} defaultValue={data.meterReading} className={classes.dataInput__input} />
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
    </LoadingWrapper>
  );
};

export default EditData;
