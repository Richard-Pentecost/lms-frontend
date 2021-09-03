import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/Button.module.scss';

const Button = ({ children, handleClick, icon }) => (
  <button type='button' className={`${classes.btn} ${classes.btn__green} ${classes.btn__medium}`} onClick={handleClick}>
    {
      icon && (
        <span className={classes.btn__icon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )
    }
    <span className={classes.btn__text}>{children}</span>
  </button>
);

export default Button;
