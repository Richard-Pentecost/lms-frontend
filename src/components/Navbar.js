import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
// import lmsLogo from '../lmsLogo.png';
import classes from '../style/Navbar.module.scss';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { token } = useSelector(state => state.authState);

  return (
    <>
      <div className={classes.logo}>
        <Link to='/home' className={classes.logo__link}>LMS</Link>
      </div>
      { token && <Dropdown /> }
    </>
  )
}

export default Navbar;