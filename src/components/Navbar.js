import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
// import lmsLogo from '../lmsLogo.png';
import classes from '../style/Navbar.module.scss';

const Navbar = ({ token, setToken }) => {

  return (
    <>
      <div className={classes.logo}>
        <Link to='/home' className={classes.logo__link}>LMS</Link>
      </div>
      { token && <Dropdown setToken={setToken} /> }
    </>
  )
}

export default Navbar;