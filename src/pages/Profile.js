import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, fetchUserByUuid , clearErrors, clearSuccessFlag } from '../store/actions/userActions';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import Alert from '../components/Alert';
import classes from '../style/SettingsForm.module.scss';

const Profile = () => {
  const { currentUser, errorMessage, showButtonSpinner, addUserSuccess } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    // dispatch(fetchUserByUuid(currentUser.uuid))
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    };
  }, [dispatch, addUserSuccess])

  const formSubmit = event => {
    event.preventDefault(); 
    const data = { name: nameRef.current.value };
    dispatch(editUser(data, currentUser.uuid));
  };

  return (
    <>
      <HeaderSection>Profile</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={nameRef} defaultValue={currentUser.name}>Name:</Input>
          <Input type='email' ref={emailRef} defaultValue={currentUser.email} disabled>Email:</Input>
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
