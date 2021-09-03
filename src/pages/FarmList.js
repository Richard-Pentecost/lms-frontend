import { useSelector } from "react-redux";
import HeaderSection from '../components/HeaderSection';
import List from '../components/List';
import classes from '../style/FarmList.module.scss';

const FarmList = () => {
  const { farms } = useSelector(state => state.farmState);
  
  return (
    <>
      <HeaderSection>Farms</HeaderSection>
      <div className={classes.farmList}>
        <List farms={farms}/>
      </div>
    </>
  );
};

export default FarmList;