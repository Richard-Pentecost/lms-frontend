import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProduct } from '../store/actions/productActions';
import Button from "../components/Button";
import HeaderSection from "../components/HeaderSection";
import Modal from '../components/Modal';
import classes from '../style/RegionList.module.scss';

const ProductList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { products } = useSelector(state => state.productState)

  const openModal = product => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const hideModal = () => {
    setSelectedProduct({});
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct.uuid));
    hideModal();
  };

  return (
    <>
      <HeaderSection>Products</HeaderSection>
      <div className={classes.regions}>
        <Button
          handleClick={() => history.push('/create-product')}
        >Add Products</Button>
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
                          event.stopPropagation();
                          openModal(product);
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
      {
        showModal && (
          <Modal
            deleteHandler={handleDelete}
            cancelHandler={hideModal}
          >
            Deleting the product will remove it from any farms that use this product, but will not affect any saved data using this product
          </Modal>
        )
      }
    </>
  );
};

export default ProductList;
