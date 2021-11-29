import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/Button.module.scss';

const Button = ({ children, handleClick, icon, styling }) => {
  let additionalClasses;

  switch (styling) {
    case 'medium red':
      additionalClasses = `${classes.btn__red} ${classes.btn__medium}`;
      break;
    case 'enable':
      additionalClasses = `${classes.btn__enable}`;
      break;
    case 'disable':
      additionalClasses = `${classes.btn__disable}`;
      break;
    default: 
      additionalClasses = `${classes.btn__green} ${classes.btn__medium}`;
  };
  
  return (
    <button type='button' className={`${classes.btn} ${additionalClasses}`} onClick={handleClick}>
      {
        icon && (
          <span className={classes.btn__icon}>
            <FontAwesomeIcon icon={icon} />
          </span>
        )
      }
      <span className={classes.btn__text}>{children}</span>
    </button>
  )
};

export default Button;
