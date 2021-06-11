import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createFarm } from '../store/actions/farmActions';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import TextArea from '../components/TextArea';
import classes from '../style/farmForm.module.scss';

const CreateFarm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();

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
    dispatch(createFarm(farm));
  };

  return (
    <div className={classes.farmForm}>
      <div className={classes.farmFormHeading}>
        <span className={classes.farmFormHeading__title}>Create Farm</span>
        <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
      </div>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={farmNameRef}>Farm Name:</Input>
        <Input type='text' ref={postcodeRef}>Postcode:</Input>
        <Input type='text' ref={contactNameRef}>Contact Name:</Input>
        <Input type='text' ref={contactNumberRef}>Contact Number:</Input>
        <TextArea rows='2' ref={accessCodesRef}>Access Codes:</TextArea>
        <TextArea rows='2' ref={commentsRef}>Comments:</TextArea>
        <FormButton type='submit'>Create Farm</FormButton> 
      </form>
    </div>
  );
};

export default CreateFarm;
