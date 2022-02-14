import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from '../store/actions/userActions';
import HeaderSection from '../components/HeaderSection';
import Modal from '../components/Modal';
import classes from '../style/Users.module.scss';

const Users = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const { users } = useSelector(state => state.userState);

  const disableDeleteButton = props.isAdmin ? undefined : { display: 'none' };

  const openModal = uuid => {
    setSelectedId(uuid);
    setShowModal(true);
  };

  const hideModal = () => {
    setSelectedId('');
    setShowModal(false);
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(selectedId));
    hideModal();
  }

  const tableBody = users && users.map(user => (
    <tr className={classes.tableBody} key={user.uuid}>
      <td className={classes.tableBody__cell}>{user.name}</td>
      <td className={classes.tableBody__cell}>{user.email}</td>
      <td className={classes.tableBody__cell}>{user.isAdmin ? 'Admin' : 'User'}</td>
      <td 
        className={classes.tableBody__cell}
        style={disableDeleteButton}
        onClick={event => {
          event.stopPropagation();
          openModal(user.uuid);
        }}
      >
        <div className={classes.tableIcon}><FontAwesomeIcon icon={[ 'far', 'trash-alt' ]} /></div>
      </td>
    </tr> 
  ));

  const modal = showModal && (
    <>
      <Modal
        deleteHandler={deleteUserHandler}
        cancelHandler={hideModal}
      >
        Are you sure you want to delete this user?
      </Modal>
    </>
  )

  return (
    <>
      <HeaderSection>Users</HeaderSection>
      <div className={classes.users}>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tableTitle}>
                <th className={classes.tableTitle__style}>Name</th>
                <th className={classes.tableTitle__style}>Email</th>   
                <th className={classes.tableTitle__style}>Permission Level</th> 
                <th className={classes.tableTitle__style}></th>   
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
      { modal }
    </>
  );
};

export default Users;