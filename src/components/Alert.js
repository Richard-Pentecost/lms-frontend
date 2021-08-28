import classes from '../style/Alert.module.scss';

const Alert = ({ children }) => (
  <div className={classes.alert}>{ children }</div>
)

export default Alert;
