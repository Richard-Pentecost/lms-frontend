import React from 'react';
import classes from '../style/TextArea.module.scss';

const TextArea = React.forwardRef(({ children, rows, defaultValue }, ref) => (
  <div className={classes.textArea}>
    <label className={classes.textArea__label}>{children}</label>
    <textarea 
      className={classes.textArea__comments}
      rows={rows}
      ref={ref}
      defaultValue={defaultValue}
    />
  </div> 
));

export default TextArea;
