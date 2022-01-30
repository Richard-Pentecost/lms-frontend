import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/ProductSelect.module.scss';

const ProductSelect = React.forwardRef(({ children, options, defaultValues }, refs) => {
  const [selectNo, setSelectNo] = useState(1);
  const [noOfSelects, setNoOfSelects] = useState(['product0']);

  useEffect(() => {

    let noOfSelectsArray;
    if (defaultValues) {
      noOfSelectsArray = defaultValues.map((defaultValue, index) => {
        return `product${index}`;
      });
      setSelectNo(noOfSelectsArray.length);
      setNoOfSelects(noOfSelectsArray);
    }
  }, [defaultValues]);

  const handleAddProduct = () => {
    setNoOfSelects([ ...noOfSelects, `product${selectNo}`]);  
    setSelectNo(selectNo + 1);
  }

  const handleRemoveSelect = (select, index) => {;
    refs.current.splice(index, 1);
    const selectArray = noOfSelects.filter(selectNo => {
      return selectNo !== select;
    });
    setNoOfSelects(selectArray);
  };

  return (
    <div className={classes.select}>
      <label className={classes.select__label}>{children}</label>
      {
        noOfSelects.map((select, index) => (
          <div className={classes.selectInput} key={select}>
            <select 
              className={classes.selectInput__field}
              ref={element => (refs.current[index] = element)}
              defaultValue={defaultValues && defaultValues[index].uuid}
            >
              <option></option>
              {
                options && options.map((option, index) => <option value={option.uuid} key={index}>{option.productName}</option>)
              }
            </select>
            {
              noOfSelects.length > 1 && (
                <div role='button' className={classes.selectInput__icon} onClick={() => handleRemoveSelect(select, index)}>
                  <FontAwesomeIcon icon={'times-circle'} />
                </div>
              )
            }
          </div>
        ))
      }
      <div className={classes.select__btnContainer}>
        <Button handleClick={handleAddProduct}>Add Product</Button>
      </div>
    </div>
  )
});

export default ProductSelect;