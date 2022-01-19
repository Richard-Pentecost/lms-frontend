import { useEffect, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editFarm, clearSuccessFlag, clearErrors, fetchActiveFarms } from '../store/actions/farmActions';
import { fetchProducts } from '../store/actions/productActions';
import { fetchRegions } from '../store/actions/regionActions';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import TextArea from '../components/TextArea';
import Alert from '../components/Alert';
import Select from '../components/Select';
import classes from '../style/FarmForm.module.scss';
import ProductSelect from '../components/ProductSelect';

const EditFarm = () => {
  const { uuid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const farm = useSelector(state => state.farmState.farms.find(farm => farm.uuid === uuid));
  const { errorMessage, loading, addFarmSuccess } = useSelector(state => state.farmState);
  const { regions } = useSelector(state => state.regionState);
  const { products } = useSelector(state => state.productState);

  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();
  const regionRef = useRef();
  const productsRef = useRef([]);

  useEffect(() => {
    !farm && dispatch(fetchActiveFarms());
  }, [dispatch, farm]);

  useEffect(() => {
    regions.length === 0 && dispatch(fetchRegions());
  }, [dispatch, regions]);

  useEffect(() => {
    products.length === 0 && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if(addFarmSuccess) {
      history.goBack();
    }
    return () => {
      dispatch(fetchActiveFarms());
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, history, addFarmSuccess])

  const formSubmit = event => {
    event.preventDefault();

    const farm = {
      farmName: farmNameRef.current.value,
      postcode: postcodeRef.current.value,
      contactName: contactNameRef.current.value,
      contactNumber: contactNumberRef.current.value,
      accessCodes: accessCodesRef.current.value,
      comments: commentsRef.current.value,
      regionFk: regionRef.current.value,
    };

    const products = productsRef.current
      .filter(product => product && product.value)
      .map(product => product.value);

    dispatch(editFarm(farm, uuid));
  }

  return (
    <div className={classes.farmForm}>
    {
      farm && (
        <>
          <div className={classes.farmFormHeading}>
            <span className={classes.farmFormHeading__title}>Edit Farm</span>
            <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
          </div>
          <form onSubmit={formSubmit}>
            <Input type='text' ref={farmNameRef} defaultValue={farm.farmName}>Farm Name:</Input>
            <Input type='text' ref={postcodeRef} defaultValue={farm.postcode}>Postcode:</Input>
            <Input type='text' ref={contactNameRef} defaultValue={farm.contactName}>Contact Name:</Input>
            <Input type='text' ref={contactNumberRef} defaultValue={farm.contactNumber}>Contact Number:</Input>
            <TextArea rows='2' ref={accessCodesRef} defaultValue={farm.accessCodes}>Access Codes:</TextArea>
            <TextArea rows='2' ref={commentsRef} defaultValue={farm.comments}>Comments:</TextArea>
            <div className={classes.farmFormRegion}>
              <Select options={regions} ref={regionRef} defaultValue={farm.regionFk}>Region:</Select>
              <Link to={'/create-region'} className={classes.farmFormRegion__link}>Add new region</Link>
            </div>
            <ProductSelect options={products} ref={productsRef} defaultValues={farm.products}>Products:</ProductSelect>
            <FormButton type='submit' loading={loading}>Edit Farm</FormButton> 
          </form>
          { errorMessage && <Alert>{errorMessage}</Alert> }
        </>
      )
    }
    </div>
  )
}

export default EditFarm;
