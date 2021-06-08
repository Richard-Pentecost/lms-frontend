import React, { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import classes from '../style/CreateUser.module.scss';

const CreateUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const formSubmit = event => {
    event.preventDefault();
    console.log('Form submitted');
  };
  
  return (
    <div classes={classes.createUser}>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={nameRef}>Name</Input>
        <Input type='email' ref={emailRef}>Email</Input>
        <Input type='password' ref={passwordRef}>Password</Input>
        <Input type='passowrd' ref={confirmPasswordRef}>Confirm Password</Input>
        <Button type='submit'>Create User</Button>
      </form>
    </div>
  )
};

export default CreateUser;

