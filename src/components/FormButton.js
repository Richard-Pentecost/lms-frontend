import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/FormButton.module.scss';

const Button = ({ children, type, loading, disabled }) => (
  <div className={classes.buttonContainer}>
    <button type={type} className={classes.button} disabled={loading || disabled}>
      { loading ?
        <div className={classes.button__loading}><FontAwesomeIcon icon={'spinner'} spin /></div>
        : children 
      }
    </button>
  </div>
);

export default Button;
