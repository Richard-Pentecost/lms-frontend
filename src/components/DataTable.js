import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/DataTable.module.scss';

const DataTable = ({ data, clickHandler }) => {
  const tableBody = data.map(d => {
    return (
      <tr className={classes.tableBody} key={d.uuid} onClick={() => clickHandler(d)}>
        {
          Object.keys(d).map(inputKey => {
            return <td className={classes.tableBody__cell} key={`${inputKey}-${d.uuid}`}>{ d[inputKey] }</td>
          })
        }
      </tr>
    )
  })
  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tableTitle}>
            <th className={classes.tableTitle__style}>Date</th>
            <th className={classes.tableTitle__style}>Cows</th>
            <th className={classes.tableTitle__style}>Product</th>
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
