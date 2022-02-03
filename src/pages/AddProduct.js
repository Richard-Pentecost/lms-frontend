import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import Alert from '../components/Alert';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import RadioButtons from '../components/RadioButtons';
import { createProduct, editProduct, clearSuccessFlag, clearErrors, fetchProducts } from '../store/actions/productActions';
import classes from '../style/FarmForm.module.scss';
import LoadingWrapper from '../components/LoadingWrapper';

const AddProduct = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorMessage, showButtonSpinner, addProductSuccess, products, loading } = useSelector(state => state.productState);
  const productObj = products.find(product => product.uuid === uuid);
  const title = productObj ? 'Edit Product' : 'Add Product'
  const productName = productObj ? productObj.productName.split('-')[0] : '';
  const [deliveryType, setDeliveryType] = useState('Tank');
  const productNameRef = useRef();
  const specificGravityRef = useRef();

  useEffect(() => {
    products.length === 0 && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if (productObj) {
      const deliveryMethod = productObj.productName.split('-')[1];
      setDeliveryType(deliveryMethod);
    } 
  }, [productObj]);

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
    if (productObj) {
      dispatch(editProduct(product, uuid));
    } else {
      dispatch(createProduct(product));
    }
  }

  const handleDeliveryTypeChange = event => {
    setDeliveryType(event.target.value);
  }
  
  return (
    <LoadingWrapper loading={loading && productObj}>
      <div className={classes.farmForm}>
        <div className={classes.farmFormHeading}>
          <span className={classes.farmFormHeading__title}>{title}</span>
          <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
        </div>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={productNameRef} defaultValue={productName}>Product</Input>
          <Input type='number' step='0.01' ref={specificGravityRef} defaultValue={productObj && productObj.specificGravity}>Specific Gravity</Input>
          <RadioButtons 
            labels={['Tank', 'Drum', 'IBC']}
            input={deliveryType}
            handleChange={handleDeliveryTypeChange}
          />
          <FormButton type='submit' loading={showButtonSpinner}>{title}</FormButton>
        </form>
        { errorMessage && <Alert>{errorMessage}</Alert>}
      </div>
    </LoadingWrapper>
  )
}

export default AddProduct;
