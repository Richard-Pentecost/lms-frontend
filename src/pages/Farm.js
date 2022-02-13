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
import LoadingWrapper from '../components/LoadingWrapper';

const Farm = () => {
  const [selectedId, setSelectedId] = useState('');
  const { uuid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const { farms, loading: farmsLoading } = useSelector(state => state.farmState);
  const { data, loading: dataLoading } = useSelector(state => state.dataState);
  const  { token, loading: userLoading } = useSelector(state => state.authState);
  const [showModal, setShowModal] = useState(false);

  const farm = farms && farms.find(farm => farm.uuid === uuid);

  useEffect(() => {
    !farms && dispatch(fetchActiveFarms());
  }, [dispatch, farms]);

  useEffect(() => {
    dispatch(fetchData(uuid));
  }, [dispatch, uuid]);

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
    <LoadingWrapper loading={farmsLoading || dataLoading || userLoading}>
      <div className={classes.farm}>
        {
          farm && data && (
            <>
              <FarmHeading farm={farm} />
              <Button 
                handleClick={() => history.push(`${pathname}/add-data`)}
              >Add Data</Button>
              { 
                data.length === 0 ? 
                  <p>No data found</p> :    
                  <DataTable data={data} clickHandler={handleRowClick} openModalHandler={openModal} isAdmin={token.isAdmin} />
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
    </LoadingWrapper>
  );
}

export default Farm;
