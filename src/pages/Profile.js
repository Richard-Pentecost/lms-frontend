import { useRef } from 'react';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import classes from '../style/SettingsForm.module.scss';

const Profile = () => {

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const formSubmit = event => {
    event.preventDefault();
    console.log('Submit');
  };

  return (
    <>
      <HeaderSection>Profile</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={nameRef}>Name:</Input>
          <Input type='text' ref={usernameRef}>Username:</Input>
          <Input type='email' ref={emailRef}>Email:</Input>
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit'>Update Profile</FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;