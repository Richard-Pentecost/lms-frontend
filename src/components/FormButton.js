import classes from '../style/FormButton.module.scss';

const Button = ({ children, type }) => (
  <div className={classes.button}>
    <button type={type} className={classes.button__btn}>{children}</button>
  </div>
);

export default Button;
