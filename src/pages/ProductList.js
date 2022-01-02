import { useSelector } from 'react-redux';
import Button from "../components/Button";
import HeaderSection from "../components/HeaderSection";
import classes from '../style/RegionList.module.scss';

const ProductList = () => {
  
  const { products } = useSelector(state => state.productState)

  return (
    <>
      <HeaderSection>Products</HeaderSection>
      <div className={classes.regions}>
        <Button>Add Products</Button>
        <div className={classes.listContainer}>
          <table className={classes.list}>
            <thead className={classes.list__head}> 
              <tr className={classes.listTitle}>
                <th className={classes.listTitle__style}>Product</th>
                <th className={classes.listTitle__style}>Specific Gravity</th>
                <th className={classes.listTitle__style}></th>
              </tr>
            </thead>
            <tbody className={classes.list__body}>
              {
                products.map(product => (
                  <tr className={classes.listBody} key={product.uuid} onClick={() => console.log('clicked row')}>
                    <td className={classes.listBody__cell}>{product.productName}</td>
                    <td className={classes.listBody__cell}>{product.specificGravity}</td>
                    <td className={classes.listBody__cell}>
                      <Button
                        styling='disable'
                        handleClick={event => {
                          event.stopPropagations();
                          console.log("Delete!!");
                        }}
                      >Delete</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductList;
