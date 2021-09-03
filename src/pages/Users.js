import { useSelector } from "react-redux";
import HeaderSection from '../components/HeaderSection';
import classes from '../style/Users.module.scss';

const Users = () => {
  const { users } = useSelector(state => state.userState);
  console.log(users);
  
  const tableBody = users.map(user => (
    <tr className={classes.tableBody} key={user.uuid}>
      <td className={classes.tableBody__cell}>{user.name}</td>
      <td className={classes.tableBody__cell}>{user.email}</td>
      <td className={classes.tableBody__cell}>{user.permissionLevel}</td>
    </tr> 
  ))
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
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;