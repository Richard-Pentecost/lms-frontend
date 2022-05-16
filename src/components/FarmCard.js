import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { deleteFarm } from '../store/actions/farmActions';
// import Button from './Button';
import dayjs from 'dayjs';
import classes from '../style/FarmCard.module.scss';

const FarmCard = ({ farm }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [recentData, setRecentData] = useState([]);

  const {
    uuid,
    farmName,
    postcode,
    contactName,
    contactNumber,
    comments,
  } = farm;

  const handleClick = () => navigate(`/farms/${uuid}`);

  // const handleDelete = event => {
  //   event.stopPropagation();
  //   dispatch(deleteFarm(uuid));
  // }

  useEffect(() => {
    if (farm.data) {
      let relevantData = [];
      farm.products.forEach(product => {
        const index = farm.data.findIndex(d => {
          return d.product === product.productName;
        });
        index >= 0 && relevantData.push(farm.data[index]);
      })
      setRecentData(relevantData);
    }
  }, [farm]);

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
          <div className={classes.farmCard__item}>
            <span className={classes.farmCard__label}>Region:</span>
            <span className={classes.farmCard__text}>{farm.region ? farm.region.regionName : 'No region'}</span>
          </div>
          <div className={classes.farmCard__item}>
            <span className={classes.farmCard__label}>Next Delivery:</span>
            <ul className={classes.farmCard__list}>
              {
                recentData.map(data => (
                  <li key={data.product}>{`${data.product} - ${dayjs(data.deliveryDate).format('ddd, DD-MM-YYYY')}`}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.farmCard__btnContainer}>
        <Link
          to={{
            pathname: `/farms/${farm.uuid}/edit-farm`,
            state: { selectedFarm: farm },
          }}
          onClick={event => event.stopPropagation()}
          className={classes.farmCard__link}
        >
          Edit Farm Details
        </Link>
        {/* <Button
          styling='disable'
          handleClick={handleDelete}
        >Delete Farm</Button> */}
      </div>
    </div>
  );
};

export default FarmCard;
