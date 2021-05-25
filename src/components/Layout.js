import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import classes from '../style/Layout.module.scss';

const Layout = ({ children, token, setToken }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.layout__navbar}>
        <Navbar token={token} setToken={setToken} />
      </div>
      <main className={classes.layout__main}>
        {children}
      </main>
      <div className={classes.layout__footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout