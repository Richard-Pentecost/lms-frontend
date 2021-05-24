import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import classes from '../style/Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout