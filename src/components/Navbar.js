import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import { isTokenValid } from '../utils/token-manager';
import classes from '../style/Navbar.module.scss';

const Navbar = () => {
  const { token } = useSelector(state => state.authState);
  // console.log("Navbar");
  // console.log(props);
  const isLoggedIn = () => {
    return Boolean(token) && isTokenValid();
  };

  return (
    <>
      <div className={classes.logo}>
        <Link to='/home' className={classes.logo__link}>LMS</Link>
      </div>
      { isLoggedIn() && <Dropdown /> }
    </>
  )
}

export default Navbar;