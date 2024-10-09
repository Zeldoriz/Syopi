/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import styles from "./OrdersOverlay.module.css";
import MyContext from "../../contexts/mycontexts";

const Orders = ({ ordersActive, setOrdersActive }) => {
  const { ordersDatabase } = useContext(MyContext);

  const handleCloseIcon = () => {
    setOrdersActive(null);
  };
  return (
    <>
      <div className={`${styles.ordersContainer} ${ordersActive}`}>
        <div className={styles.closeIconContainer} onClick={handleCloseIcon}>
          <img className={styles.closeIcon} src="src\assets\Navbar\CloseIcon.svg" alt="Close Icon" />
        </div>
        <div className={styles.ordersContent}>
          <h1>Orders</h1>
          {ordersDatabase.map((order, index) => (
            <div key={index} className={styles.order}>
              <h2>Order ID: {order.id}</h2>
              <h3>
                Order Date: {order.date},{order.time}
              </h3>
              <h3>User ID: {order.userId}</h3>
              <h3>Total Price: {order.totalPrice}</h3>
              <h3>Status: {order.status}</h3>
              <div className={styles.products}>
                {order.products.map((product, index) => (
                  <div key={index} className={styles.product}>
                    <h4>{product.title}</h4>
                    <h4>Quantity: {product.quantity}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
