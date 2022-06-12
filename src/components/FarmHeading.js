import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/FarmHeading.module.scss';

const FarmHeading = ({ farm }) => (
  <div className={classes.farmHeader}>
    <div className={classes.farmHeader__title}>
      <span className={classes.farmHeader__text}>{farm.farmName}</span>
      <Link to={`edit-farm`}>
        <span className={classes.farmHeader__link}>
          <FontAwesomeIcon icon={[ 'far', 'edit' ]} />
        </span>
      </Link>
    </div>
    <div className={classes.farmHeader__info}>
      <div>
        <label>Contact: </label>
        <span>{farm.contactName}</span>
      </div>
      <div>
        <label>Number: </label>
        <span>{farm.contactNumber}</span>
      </div>
      <div>
        <label>Postcode: </label>
        <span>{farm.postcode}</span>
      </div>
      {
        farm.accessCodes && (
          <div>
            <label>Access Codes: </label>
            <span>{farm.accessCodes}</span>
          </div>
        )
      }
    </div>
  </div>
);


export default FarmHeading;
