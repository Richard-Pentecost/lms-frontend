import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Alert from '../components/Alert';
import Input from '../components/Input';
import FormButton from '../components/FormButton';
import { createRegion, editRegion, fetchRegions, clearErrors, clearSuccessFlag } from '../store/actions/regionActions';
import LoadingWrapper from '../components/LoadingWrapper';
import classes from '../style/AddProduct.module.scss';

const AddRegion = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, showButtonSpinner, addRegionSuccess, regions, loading } = useSelector(state => state.regionState);
  const regionObj = regions.find(region => region.uuid === uuid);
  const title = regionObj ? 'Edit Region' : 'Add Region';
  const region = regionObj ? regionObj.regionName : '';

  const regionRef = useRef();

  useEffect(() => {
    !regions && dispatch(fetchRegions());
  }, [dispatch, regions]);

  useEffect(() => {
    if (addRegionSuccess) {
      navigate(-1);
    }
    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, addRegionSuccess]);

  const formSubmit = event => {
    event.preventDefault(); 
    if (regionObj) {
      dispatch(editRegion({ regionName: regionRef.current.value }, uuid));
    } else {
      dispatch(createRegion({ regionName: regionRef.current.value }));
    }
  }

  return (
    <LoadingWrapper loading={loading && regionObj}>
      <div className={classes.farmForm}>
        <div className={classes.farmFormHeading}>
          <span className={classes.farmFormHeading__title}>{title}</span>
          <span className={classes.farmFormHeading__backLink} onClick={() => navigate(-1)}>Go Back</span>
        </div>
        <form onSubmit={formSubmit}>
          <Input type="text" ref={regionRef} defaultValue={region}>Region</Input>
          <FormButton type='submit' loading={showButtonSpinner}>{title}</FormButton>
        </form>
        { errorMessage && <Alert>{errorMessage}</Alert>}
      </div>
    </LoadingWrapper>
  )
}

export default AddRegion;
