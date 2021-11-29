import Button from './Button';
import classes from '../style/Modal.module.scss';

const Modal = ({ children, deleteHandler, cancelHandler}) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modalBox}>
      <div className={classes.modalBox__text}>{children}</div>
      <div className={classes.modalBox__btn}>
        <Button handleClick={deleteHandler}>Continue</Button>
        <Button handleClick={cancelHandler} styling='medium red'>Cancel</Button>
      </div>
      </div>
    </div>
  );
};

export default Modal;
