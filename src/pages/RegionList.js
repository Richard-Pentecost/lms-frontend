import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRegion } from '../store/actions/regionActions';
import HeaderSection from '../components/HeaderSection';
import Button from '../components/Button';
import Modal from '../components/Modal';
import classes from '../style/RegionList.module.scss';

const RegionList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const { regions } = useSelector(state => state.regionState);

  const openModal = region => {
    setSelectedRegion(region);
    setShowModal(true);
  };

  const hideModal = () => {
    setSelectedRegion({});
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteRegion(selectedRegion.uuid));
    hideModal();
  }

  const handleRowClick = region => {
    history.push(`/edit-region/${region.uuid}`);
  }

  return (
    <>
      <HeaderSection>Regions</HeaderSection>
      <div className={classes.regions}>
        <Button
          handleClick={() => history.push('/create-region')}
        >Add Region</Button>
        <div className={classes.listContainer}>
          <table className={classes.list}>
            <thead className={classes.list__head}>
              <tr className={classes.listTitle}>
                <th className={classes.listTitle__style}>Region</th>
                <th className={classes.listTitle__style}></th>
              </tr>
            </thead>
            <tbody className={classes.list__body}>
              {
                regions.map(region => (
                  <tr className={classes.listBody} key={region.uuid} onClick={() => handleRowClick(region)}>
                    <td className={classes.listBody__cell}>{region.regionName}</td>
                    <td className={classes.listBody__cell}>
                      <Button 
                        styling='disable'
                        handleClick={event => {
                          event.stopPropagation();
                          openModal(region);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        showModal && (
          <Modal
            deleteHandler={handleDelete}
            cancelHandler={hideModal}
          >
            Deleting the region will remove it from any farms that have it as their region
          </Modal>
        )
      }
    </>
  )
}

export default RegionList;