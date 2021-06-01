import { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import classes from '../style/Login.module.scss';
// import Form from '../components/Form';

const Login = ({ history, setToken }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmit = event => {
    event.preventDefault()
    
    if (emailRef.current.value === 'Richard' && passwordRef.current.value === 'asdf') {
      setToken(true);
      history.push('/home');
    }
  };

  return (
    <div className={classes.login}>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={emailRef}>Email</Input>
        <Input type='password' ref={passwordRef}>Password</Input>
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
}

export default Login;
