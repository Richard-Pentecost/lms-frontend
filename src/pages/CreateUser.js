import { useRef } from 'react';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import classes from '../style/SettingsForm.module.scss';

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
    <>
      <HeaderSection>Create User</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={nameRef}>Name</Input>
          <Input type='email' ref={emailRef}>Email</Input>
          <Input type='password' ref={passwordRef}>Password</Input>
          <Input type='password' ref={confirmPasswordRef}>Confirm Password</Input>
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit'>Create User</FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;

