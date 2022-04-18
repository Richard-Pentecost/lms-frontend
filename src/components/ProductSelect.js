import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/ProductSelect.module.scss';

const ProductSelect = React.forwardRef(({ children, options, defaultValues }, refs) => {
  const [selectNo, setSelectNo] = useState(0);
  const [noOfSelects, setNoOfSelects] = useState([]);
  const [selectDefaultValues, setSelectDefaultValues] = useState();

  useEffect(() => {
    let noOfSelectsArray = [];

    if (defaultValues) {
      noOfSelectsArray = defaultValues.map((defaultValue, index) => {
        return `product${index}`;
      });
      setSelectDefaultValues(defaultValues);
    } else {
      noOfSelectsArray.push('product0');
    }

    setNoOfSelects(noOfSelectsArray);
    setSelectNo(noOfSelectsArray.length);
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

    selectDefaultValues && setSelectDefaultValues([...selectDefaultValues.slice(0, index), ...selectDefaultValues.slice(index + 1, selectDefaultValues.length)]);
    
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
              defaultValue={selectDefaultValues && selectDefaultValues[index] && selectDefaultValues[index].uuid}
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