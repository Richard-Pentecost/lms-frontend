import { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, deleteData } from '../store/actions/dataActions';
import { fetchActiveFarms } from '../store/actions/farmActions';
import FarmHeading from '../components/FarmHeading';
import Button from '../components/Button'
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import classes from '../style/Farm.module.scss';

const Farm = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const { uuid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));
  const { data } = useSelector(state => state.dataState);
  const  { isAdmin } = useSelector(state => state.authState.token);

  useEffect(() => {
    if (!farm) {
      dispatch(fetchActiveFarms());
    }
    dispatch(fetchData(uuid));
  }, [dispatch, uuid, farm]);

  const handleRowClick = input => {
    history.push(`${pathname}/edit-data/${input.uuid}`);
  };

  const openModal = uuid => {
    setSelectedId(uuid);
    setShowModal(true);
  }

  const hideModal = () => {
    setSelectedId('');
    setShowModal(false);
  }

  const deleteDataHandler = () => {
    const dataId = selectedId;
    const farmId = uuid;

    dispatch(deleteData(farmId, dataId));
    hideModal();
  }

  return (
    <div className={classes.farm}>
      {
        farm && (
          <>
            <FarmHeading farm={farm} />
            <Button 
              handleClick={() => history.push(`${pathname}/add-data`)}
            >Add Data</Button>
            { 
              data.length === 0 ? 
                <p>No data found</p> :    
                <DataTable data={data} clickHandler={handleRowClick} openModalHandler={openModal} isAdmin={isAdmin} />
            }
            {
              showModal && 
                <Modal 
                  deleteHandler={deleteDataHandler}
                  cancelHandler={hideModal}
                >
                  Are you sure you want to delete data?
                </Modal>
            }
          </>
        )
      }
    </div>
  );
}

export default Farm;
