import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/actions/userActions';
import Alert from '../components/Alert';
import FormButton from '../components/FormButton';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import RadioButtons from '../components/RadioButtons';
import classes from '../style/SettingsForm.module.scss';

const CreateUser = () => {
  const [permissionLevel, setPermissionLevel] = useState('user');
  // const history = useHistory();
  const dispatch = useDispatch();
  // const { errorMessage, loading } = useSelector(state => state.farmState);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const formSubmit = event => {
    event.preventDefault();
    
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        permissionLevel
      };
      dispatch(createUser(user));
    } else {
      console.log('error');
    }
  };

  const handlePermissionChange = (event) => {
    setPermissionLevel(event.target.value);
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
          <RadioButtons  
            firstLabel='User'
            firstValue='user'
            secondLabel='Admin'
            secondValue='admin'
            input={permissionLevel}
            handleChange={handlePermissionChange}
          />
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit'>Create User</FormButton>
          </div>
        </form>
        {/* { errorMessage && <Alert>{errorMessage}</Alert> } */}
      </div>
    </>
  );
};

export default CreateUser;

