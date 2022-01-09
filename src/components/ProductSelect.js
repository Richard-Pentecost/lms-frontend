import React from 'react';
import { useState } from 'react';
import Button from './Button';
import classes from '../style/ProductSelect.module.scss';

const ProductSelect = React.forwardRef(({ children, options }, refs) => {
  const [noOfSelects, setNoOfSelects] = useState(['product1']);

  const handleAddProduct = () => {
    setNoOfSelects([ ...noOfSelects, `product${noOfSelects.length + 1}`]);  
  }

  return (
    <div className={classes.select}>
      <label className={classes.select__label}>{children}</label>
      {
        noOfSelects.map((select, index) => (
          <select 
            className={classes.select__field}
            key={select}
            ref={element => (refs.current[index] = element)}
          >
            <option></option>
            {
              options && options.map((option, index) => <option value={option.uuid} key={index}>{option.productName}</option>)
            }
          </select>
        ))
      }
      <div className={classes.select__btnContainer}>
        <Button handleClick={handleAddProduct}>Add Product</Button>
      </div>
    </div>
  )
});

export default ProductSelect;