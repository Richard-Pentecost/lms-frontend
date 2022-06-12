import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import Alert from '../components/Alert';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import classes from '../style/Login.module.scss';
// import Form from '../components/Form';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errorMessage, loading } = useSelector(state => state.authState);

  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmit = event => {
    event.preventDefault()
    dispatch(loginUser({ 
      email: emailRef.current.value,
      password: passwordRef.current.value, 
    }));  
    navigate('/home');
  };

  return (
    <div className={classes.login}>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={emailRef}>Email</Input>
        <Input type='password' ref={passwordRef}>Password</Input>
        <FormButton type='submit' loading={loading}>Login</FormButton>
      </form>
      { errorMessage && <Alert>{errorMessage}</Alert> }
    </div>
  );
}

export default Login;
