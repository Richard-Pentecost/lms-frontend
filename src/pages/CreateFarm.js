import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createFarm, clearSuccessFlag, clearErrors } from '../store/actions/farmActions';
import { fetchProducts } from '../store/actions/productActions';
import { fetchRegions } from '../store/actions/regionActions';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import Alert from '../components/Alert';
import ProductSelect from '../components/ProductSelect';
import classes from '../style/FarmForm.module.scss';
import LoadingWrapper from '../components/LoadingWrapper';

const CreateFarm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { errorMessage,loading, addFarmSuccess } = useSelector(state => state.farmState);
  const { regions, loading: regionsLoading } = useSelector(state => state.regionState);
  const { products, loading: productsLoading } = useSelector(state => state.productState);

  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();
  const regionRef = useRef();
  const productsRef = useRef([]);

  useEffect(() => {
    regions.length === 0 && dispatch(fetchRegions());
  }, [dispatch, regions, products]);

  useEffect(() => {
    products.length === 0 && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if (addFarmSuccess) {
      history.goBack();
    }
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, history, addFarmSuccess]);

  const formSubmit = event => {
    event.preventDefault();
    let region;

    if (regionRef.current.value) {
      region = regions.find(region => region.uuid === regionRef.current.value);
    }

    const farm = {
      farmName: farmNameRef.current.value,
      postcode: postcodeRef.current.value,
      contactName: contactNameRef.current.value,
      contactNumber: contactNumberRef.current.value,
      accessCodes: accessCodesRef.current.value,
      comments: commentsRef.current.value,
      regionFk: region && region.uuid,
    };

    const products = productsRef.current
      .filter(product => product && product.value)
      .map(product => product.value);

    dispatch(createFarm(farm, products));
  };

  return (
    <LoadingWrapper loading={regionsLoading || productsLoading}>
      <div className={classes.farmForm}>
        <div className={classes.farmFormHeading}>
          <span className={classes.farmFormHeading__title}>Create Farm</span>
          <span className={classes.farmFormHeading__backLink} onClick={() => history.goBack()}>Go Back</span>
        </div>
        <form onSubmit={formSubmit}>
          <Input type='text' ref={farmNameRef}>Farm Name:</Input>
          <Input type='text' ref={postcodeRef}>Postcode:</Input>
          <Input type='text' ref={contactNameRef}>Contact Name:</Input>
          <Input type='text' ref={contactNumberRef}>Contact Number:</Input>
          <TextArea rows='2' ref={accessCodesRef}>Access Codes:</TextArea>
          <TextArea rows='2' ref={commentsRef}>Comments:</TextArea>
          <div className={classes.farmFormRegion}>
            <Select options={regions} ref={regionRef}>Region:</Select>
            <Link to={'/create-region'} className={classes.farmFormRegion__link}>Add new region</Link>
          </div>
          <ProductSelect options={products} ref={productsRef}>Products:</ProductSelect>
          <FormButton type='submit' loading={loading}>Create Farm</FormButton> 
        </form>
        { errorMessage && <Alert>{errorMessage}</Alert> }
      </div>
    </LoadingWrapper>
  );
};

export default CreateFarm;
