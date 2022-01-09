import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import Alert from '../components/Alert';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import RadioButtons from '../components/RadioButtons';
import { createProduct, clearSuccessFlag, clearErrors } from '../store/actions/productActions';
import classes from '../style/FarmForm.module.scss';

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorMessage, showButtonSpinner, addProductSuccess } = useSelector(state => state.productState);
  
  const [deliveryType, setDeliveryType] = useState('Tank');

  const productNameRef = useRef();
  const specificGravityRef = useRef();

  useEffect(() => {
    if (addProductSuccess) {
      history.goBack();
    }
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, history, addProductSuccess]);

  const formSubmit = event => {
    event.preventDefault();
    const product = {
      productName: `${productNameRef.current.value}-${deliveryType}`,
      specificGravity: specificGravityRef.current.value,
    }

    dispatch(createProduct(product));
  }

  const handleDeliveryTypeChange = event => {
    setDeliveryType(event.target.value);
  }
  
  return (
    <div className={classes.farmForm}>
      <div className={classes.farmFormHeading}>
        <span className={classes.farmFormHeading__title}>Add Product</span>
        <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
      </div>
      <form onSubmit={formSubmit}>
        <Input type='text' ref={productNameRef}>Product</Input>
        <Input type='number' step='0.01' ref={specificGravityRef}>Specific Gravity</Input>
        <RadioButtons 
          firstLabel="Tank"
          firstValue='Tank'
          secondLabel='Drum'
          secondValue='Drum'
          input={deliveryType}
          handleChange={handleDeliveryTypeChange}
        />
        <FormButton type='submit' loading={showButtonSpinner}>Add Product</FormButton>
      </form>
      { errorMessage && <Alert>{errorMessage}</Alert>}
    </div>
  )
}

export default AddProduct;
