import React, { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import classes from '../style/CreateFarm.module.scss';

const CreateFarm = () => {
  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();

  const formSubmit = event => {
    event.preventDefault();
    console.log('Form submitted');
  }

  return (
    <div className={classes.createFarm}>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={farmNameRef}>Farm Name:</Input>
        <Input type='text' ref={postcodeRef}>Postcode:</Input>
        <Input type='text' ref={contactNameRef}>Contact Name</Input>
        <Input type='text' ref={contactNumberRef}>Contact Number</Input>
        <TextArea rows='2' ref={accessCodesRef}>Access Codes</TextArea>
        <TextArea rows='2' ref={commentsRef}>Comments</TextArea>
        <Button type='submit'>Create Farm</Button> 
      </form>
    </div>
  );
};

export default CreateFarm;
