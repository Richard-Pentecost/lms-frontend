import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderSection from '../components/HeaderSection';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import { editUser } from '../store/actions/userActions';
import classes from '../style/SettingsForm.module.scss';

const Profile = () => {
  const { loading, currentUser } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();

  const formSubmit = event => {
    event.preventDefault(); 
    const data = { name: nameRef.current.value };
    const { uuid } = currentUser;
    dispatch(editUser(data, uuid));
  };

  return (
    <>
      <HeaderSection>Profile</HeaderSection>
      <div className={classes.settingsForm}>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={nameRef} defaultValue={currentUser.name}>Name:</Input>
          <Input type='email' ref={emailRef} defaultValue={currentUser.email} disabled>Email:</Input>
          <div className={classes.settingsForm__btnContainer}>
            <FormButton type='submit'>Update Profile</FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
