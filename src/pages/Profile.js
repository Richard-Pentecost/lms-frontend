import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, clearErrors, clearSuccessFlag } from '../store/actions/userActions';
import { fetchLoggedInUser } from '../store/actions/authActions';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import Alert from '../components/Alert';
import classes from '../style/SettingsForm.module.scss';

const Profile = () => {
  const { loggedInUser } = useSelector(state => state.authState)
  const { errorMessage, showButtonSpinner, addUserSuccess } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    addUserSuccess && dispatch(fetchLoggedInUser(loggedInUser.uuid));
    
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    };
  }, [dispatch, addUserSuccess, loggedInUser])

  const formSubmit = event => {
    event.preventDefault(); 
    const data = { name: nameRef.current.value };
    dispatch(editUser(data, loggedInUser.uuid));
  };

  return (
    <>
      <HeaderSection>Profile</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={nameRef} defaultValue={loggedInUser.name}>Name:</Input>
          <Input type='email' ref={emailRef} defaultValue={loggedInUser.email} disabled>Email:</Input>
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit' loading={showButtonSpinner}>Update Profile</FormButton>
          </div>
        </form>
        { errorMessage && <Alert>{errorMessage}</Alert> } 
      </div>
    </>
  );
};

export default Profile;
