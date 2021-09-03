import { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editFarm, clearSuccessFlag, clearErrors, fetchActiveFarms } from '../store/actions/farmActions';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import TextArea from '../components/TextArea';
import classes from '../style/farmForm.module.scss';
import Alert from '../components/Alert';

const EditFarm = () => {
  const { uuid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));
  const { errorMessage, loading, addFarmSuccess } = useSelector(state => state.farmState);

  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();

  useEffect(() => {
    if(addFarmSuccess) {
      history.goBack();
    }
    return () => {
      dispatch(fetchActiveFarms());
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, history, addFarmSuccess])

  const formSubmit = event => {
    event.preventDefault();
    const farm = {
      farmName: farmNameRef.current.value,
      postcode: postcodeRef.current.value,
      contactName: contactNameRef.current.value,
      contactNumber: contactNumberRef.current.value,
      accessCodes: accessCodesRef.current.value,
      comments: commentsRef.current.value,
    };
    dispatch(editFarm(farm, uuid));
  }

  return (
    <div className={classes.farmForm}>
      <div className={classes.farmFormHeading}>
        <span className={classes.farmFormHeading__title}>Edit Farm</span>
        <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
      </div>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={farmNameRef} defaultValue={farm.farmName}>Farm Name:</Input>
        <Input type='text' ref={postcodeRef} defaultValue={farm.postcode}>Postcode:</Input>
        <Input type='text' ref={contactNameRef} defaultValue={farm.contactName}>Contact Name:</Input>
        <Input type='text' ref={contactNumberRef} defaultValue={farm.contactNumber}>Contact Number:</Input>
        <TextArea rows='2' ref={accessCodesRef} defaultValue={farm.accessCodes}>Access Codes:</TextArea>
        <TextArea rows='2' ref={commentsRef} defaultValue={farm.comments}>Comments:</TextArea>
        <FormButton type='submit' loading={loading}>Edit Farm</FormButton> 
      </form>
      { errorMessage && <Alert>{errorMessage}</Alert>}
    </div>
  )
}

export default EditFarm;
