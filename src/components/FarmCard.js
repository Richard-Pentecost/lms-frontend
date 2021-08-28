import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/FarmCard.module.scss';

const FarmCard = ({ farm }) => {
  const history = useHistory();
  const {
    uuid,
    farmName,
    postcode,
    contactName,
    contactNumber,
    comments
  } = farm;

  const handleClick = () => history.push(`/farms/${uuid}`);

  return (
    <div className={classes.farmCard} onClick={handleClick}>
      <div className={classes.farmCard__main}>
        <div className={classes.farmCard__header}>
          {farmName}
        </div>
        <div className={classes.farmCard__body}>
          <div className={classes.farmCard__item}>
            <span><FontAwesomeIcon icon={[ 'far', 'address-card' ]} /></span>
            <span className={classes.farmCard__text}>{postcode}</span>
          </div>
          <div className={classes.farmCard__item}>
            <span><FontAwesomeIcon icon={'user'} /></span>
            <span className={classes.farmCard__text}>{contactName}</span>
          </div>
          <div className={classes.farmCard__item}>
            <span><FontAwesomeIcon icon={'phone-square'} /></span>
            <span className={classes.farmCard__text}>{contactNumber}</span>
          </div>
          {
            farm.comments && (
              <div className={classes.farmCard__item}>
                <span className={classes.farmCard__label}>Comments:</span>
                <span className={classes.farmCard__text}>{comments}</span>
              </div>
            )
          }
        </div>
      </div>
      <div className={classes.farmCard__btnContainer}>
        <Link
          to={{
            pathname: `farms/${farm.id}/edit-farm`,
            state: { selectedFarm: farm },
          }}
          onClick={event => event.stopPropagation()}
          className={classes.farmCard__link}
        >
          Edit Farm Details
        </Link>
      </div>
    </div>
  );
};

export default FarmCard;
