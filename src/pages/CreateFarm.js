import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import LoadingWrapper from '../components/LoadingWrapper';
import classes from '../style/AddProduct.module.scss';

const CreateFarm = () => {
  const navigate = useNavigate();
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
    !regions && dispatch(fetchRegions());
  }, [dispatch, regions]);

  useEffect(() => {
    !products && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if (addFarmSuccess) {
      navigate(-1);
    }
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, addFarmSuccess]);

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
      .map((product, index) => {
        return { uuid: product.value, order: index + 1 }
      });

    dispatch(createFarm(farm, products));
  };

  return (
    <LoadingWrapper loading={regionsLoading || productsLoading}>
      <div className={classes.farmForm}>
        <div className={classes.farmFormHeading}>
          <span className={classes.farmFormHeading__title}>Create Farm</span>
          <span className={classes.farmFormHeading__backLink} onClick={() => navigate(-1)}>Go Back</span>
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
