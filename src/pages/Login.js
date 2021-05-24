import { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import classes from '../style/Login.module.scss';
// import Form from '../components/Form';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmit = event => {
    event.preventDefault()
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <div className={classes.login}>
      <form onSubmit={formSubmit}>
        <Input type="email" ref={emailRef}>Email</Input>
        <Input type="password" ref={passwordRef}>Password</Input>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
