import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editFarm, fetchFarms, clearSuccessFlag } from '../store/actions/farmActions';
import HeaderSection from '../components/HeaderSection';
import List from '../components/List';
import Modal from "../components/Modal";
import classes from '../style/FarmList.module.scss';

const FarmList = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState({});
  const { farms, addFarmSuccess } = useSelector(state => state.farmState);
  
  useEffect(() => { 
    dispatch(fetchFarms());

    return () => dispatch(clearSuccessFlag());
  }, [dispatch, addFarmSuccess])

  const openModal = farm => {
    setSelectedFarm(farm);
    setShowModal(true);
  };

  const hideModal = () => {
    setSelectedFarm({});
    setShowModal(false);
  };

  const handleBtnClick = () => {
    dispatch(editFarm({ isActive: !selectedFarm.isActive }, selectedFarm.uuid));
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
      <HeaderSection>Farms</HeaderSection>
      <div className={classes.farmList}>
        <List farms={farms} openModalHandler={openModal} />
      </div>
      {
        showModal && modal
      }
    </>
  );
};

export default FarmList;