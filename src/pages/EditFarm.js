import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editFarm, clearSuccessFlag, clearErrors, fetchActiveFarms } from '../store/actions/farmActions';
import { fetchProducts } from '../store/actions/productActions';
import { fetchRegions } from '../store/actions/regionActions';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import TextArea from '../components/TextArea';
import Alert from '../components/Alert';
import Select from '../components/Select';
import ProductSelect from '../components/ProductSelect';
import LoadingWrapper from '../components/LoadingWrapper';
import classes from '../style/AddProduct.module.scss';

const EditFarm = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { farms, errorMessage, loading: farmsLoading, addFarmSuccess } = useSelector(state => state.farmState);
  const { regions, loading: regionsLoading } = useSelector(state => state.regionState);
  const { products, loading: productsLoading } = useSelector(state => state.productState);

  const farm = farms && farms.find(farm => farm.uuid === uuid);

  const farmNameRef = useRef();
  const postcodeRef = useRef();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const accessCodesRef = useRef();
  const commentsRef = useRef();
  const regionRef = useRef();
  const productsRef = useRef([]);

  useEffect(() => {
    !farms && dispatch(fetchActiveFarms());
  }, [dispatch, farms]);

  useEffect(() => {
    !regions && dispatch(fetchRegions());
  }, [dispatch, regions]);

  useEffect(() => {
    !products && dispatch(fetchProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if(addFarmSuccess) {
      navigate(-1);
    }
    return () => {
      dispatch(fetchActiveFarms());
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, addFarmSuccess])

  const formSubmit = event => {
    event.preventDefault();

    const farmObj = {
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
      .map((product, index) => {
        return { uuid: product.value, order: index + 1 }
      });

    dispatch(editFarm(farmObj, products, uuid));
  }

  return (
    <LoadingWrapper loading={farmsLoading || regionsLoading || productsLoading}>
      <div className={classes.farmForm}>
      {
        farm && (
          <>
            <div className={classes.farmFormHeading}>
              <span className={classes.farmFormHeading__title}>Edit Farm</span>
              <span className={classes.farmFormHeading__backLink} onClick={() => navigate(-1)}>Go Back</span>
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
              <FormButton type='submit' loading={farmsLoading}>Edit Farm</FormButton> 
            </form>
            { errorMessage && <Alert>{errorMessage}</Alert> }
          </>
        )
      }
      </div>
    </LoadingWrapper>
  )
}

export default EditFarm;
