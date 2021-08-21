import classes from '../style/HeaderSection.module.scss';

const HeaderSection = ({ children }) => (
  <div className={classes.header}>{children}</div>
);

export default HeaderSection;
