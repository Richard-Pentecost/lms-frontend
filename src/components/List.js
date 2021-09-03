import classes from '../style/List.module.scss';
const List = ({ farms }) => {

  const tableRows = farms.map(farm => (
    <tr className={classes.listBody} key={farm.uuid}>
      <td className={classes.listBody__cell}>{farm.farmName}</td>
    </tr>
  ));

  return (
    <div className={classes.listContainer}>
      <table className={classes.list}>
        <thead className={classes.list__head}>
          <tr className={classes.listTitle}>
            <th className={classes.listTitle__style}>Farm name</th>
          </tr>
        </thead>
        <tbody className={classes.list__body}>{tableRows}</tbody>
      </table>
    </div>
  )
};

export default List;
