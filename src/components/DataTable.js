import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/DataTable.module.scss';

const DataTable = ({ data, clickHandler, openModalHandler, isAdmin }) => {
  const disableDeleteButton = isAdmin ? undefined : { display: 'none' };

  const tableBody = data.map(rowData => {
    const objectKeys = Object.keys(rowData).filter(inputKey => inputKey !== 'uuid' && inputKey !== 'farmFk');
    return (
      <tr className={classes.tableBody} key={rowData.uuid} onClick={() => clickHandler(rowData)}>
        {
          objectKeys.map(inputKey => {
            if (inputKey === 'date' || inputKey === 'deliveryDate') {
              return <td className={`${classes.tableBody__cell} ${classes.tableDate}`} key={`${inputKey}-${rowData.uuid}`}>{ rowData[inputKey] && dayjs(rowData[inputKey]).format('ddd, DD-MM-YYYY') }</td>
            } else {
              return <td className={inputKey === 'comments' ? `${classes.tableBody__cell} ${classes.tableComment}` : `${classes.tableBody__cell}`} key={`${inputKey}-${rowData.uuid}`}>{ rowData[inputKey] }</td>
            }
          })
        }
        <td 
          className={classes.tableBody__cell}
          onClick={event => {
            event.stopPropagation();
            isAdmin && openModalHandler(rowData.uuid);
          }}
        >
          <div style={disableDeleteButton} className={classes.tableIcon}><FontAwesomeIcon icon={[ 'far', 'trash-alt' ]}/></div>
        </td>
      </tr>
    )
  });

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tableTitle}>
            <th className={classes.tableTitle__style}>Date</th>
            <th className={classes.tableTitle__style}>Product</th>
            <th className={classes.tableTitle__style}>Cows</th>
            <th className={classes.tableTitle__style}>Quantity</th>
            <th className={classes.tableTitle__style}>Meter Reading</th>
            <th className={classes.tableTitle__style}>Water Usage</th>
            <th className={classes.tableTitle__style}>Average Water Intake</th>
            <th className={classes.tableTitle__style}>Pump Dial</th>
            <th className={classes.tableTitle__style}>Float Before Delivery</th>
            <th className={classes.tableTitle__style}>kg Actual</th>
            <th className={classes.tableTitle__style}>Target Feed Rate</th>
            <th className={classes.tableTitle__style}>Actual Feed Rate</th>
            <th className={classes.tableTitle__style}>Float After Delivery</th>
            <th className={classes.tableTitle__style}>Delivery Date</th>
            <th className={classes.tableTitle__style}>Comments</th>
            <th className={classes.tableTitle__style}></th>
          </tr>
        </thead>
        <tbody>
          { tableBody }
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
