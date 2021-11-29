import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors, clearSuccessFlag } from '../store/actions/userActions';
import Alert from '../components/Alert';
import FormButton from '../components/FormButton';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import classes from '../style/SettingsForm.module.scss';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { currentUser, errorMessage, showButtonSpinner, addUserSuccess } = useSelector(state => state.userState);

  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    oldPasswordRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';

    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    };
  }, [dispatch, addUserSuccess]);
  
  const formSubmit = (event) => {
    event.preventDefault(); 
    const data = {
      oldPassword: oldPasswordRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }
    dispatch(updatePassword(data, currentUser.uuid));
  }

  return (
    <>
      <HeaderSection>Change Password</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='password' ref={oldPasswordRef}>Old Password</Input>
          <Input type='password' ref={passwordRef}>New Password</Input>
          <Input type='password' ref={confirmPasswordRef}>Confirm Password</Input>
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit' loading={showButtonSpinner}>Change Password</FormButton>
          </div>
        </form>
        { errorMessage && <Alert>{errorMessage}</Alert> }
      </div>
    </>
  );
};

export default ChangePassword;
