import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disableFarm } from '../store/actions/farmActions';
import HeaderSection from '../components/HeaderSection';
import List from '../components/List';
import Modal from "../components/Modal";
import classes from '../style/FarmList.module.scss';

const FarmList = () => {
  const dispatch = useDispatch();
  
  const { allFarms } = useSelector(state => state.farmState);

  const [showModal, setShowModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState({});

  const openModal = farm => {
    setSelectedFarm(farm);
    setShowModal(true);
  };

  const hideModal = () => {
    setSelectedFarm({});
    setShowModal(false);
  };

  const handleBtnClick = () => {
    dispatch(disableFarm({ isActive: !selectedFarm.isActive }, selectedFarm.uuid));
    hideModal();
  }

  const modal = (
    <> 
      <Modal
        deleteHandler={handleBtnClick}
        cancelHandler={hideModal}
      >
        {
          selectedFarm.isActive
            ? 'Disabling this farm will remove the farm from the home page but will not delete any data'
            : 'Enabling this farm will allow the farm to accessed from the home page'
        }
      </Modal>
    </>
  );

  return (
    <>
      {
        allFarms && (
          <>
            <HeaderSection>Farms</HeaderSection>
            <div className={classes.farmList}>
              <List farms={allFarms} openModalHandler={openModal} />
            </div>
            {
              showModal && modal
            }
          </>
        )
      }
    </>
  );
};

export default FarmList;