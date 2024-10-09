/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./CartOverlay.module.css";
import MyContext from "./../../contexts/mycontexts";
import { useContext } from "react";
import useGetAllProducts from "./../../hooks/useGetAllProducts";

const CartOverlay = ({ cartActive, setCartActive }) => {
  const {
    loggedUser,
    setLoggedUser,
    cartsDatabase,
    setCartsDatabase,
    activeCart,
    setActiveCart,
    ordersDatabase,
    setOrdersDatabase
  } = useContext(MyContext);

  const getAllProducts = useGetAllProducts();
  const [products, setProducts] = useState([]);

  const [cartContent, setCartContent] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, [getAllProducts]);

  useEffect(() => {
    setCartContent(activeCart?.products);
    let productsInCart = [];
    cartContent?.forEach((cartItem) => {
      products.forEach((product) => {
        if (cartItem.productId === product.id) productsInCart.push({ ...product, quantity: cartItem.quantity });
      });
    });
    setProductsInCart(productsInCart);

    let total = 0;
    productsInCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  }, [activeCart, products]);

  const getDateTime = () => {
    let today = new Date();
    let date = today.getDate() + 1 + "/" + today.getMonth() + "/" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return { date, time };
  };

  const handleCloseIcon = () => {
    setCartActive(null);
  };

  const handleCheckout = () => {
    if (productsInCart.length !== 0) {
      let lastOrderId = ordersDatabase.length == 0 ? 1 : ordersDatabase[ordersDatabase.length - 1].id + 1;

      !ordersDatabase
        ? setOrdersDatabase({
            id: lastOrderId,
            userId: loggedUser.id,
            products: productsInCart,
            totalPrice: totalPrice,
            date: getDateTime().date,
            time: getDateTime().time,
            status: "pending"
          })
        : setOrdersDatabase([
            ...ordersDatabase,
            {
              id: lastOrderId,
              userId: loggedUser.id,
              products: productsInCart,
              totalPrice: totalPrice,
              date: getDateTime().date,
              time: getDateTime().time,
              status: "pending"
            }
          ]);
      setActiveCart({ userId: loggedUser.id, products: [] });
      const updatedCartsDatabase = cartsDatabase.map((cart) =>
        cart.userId === loggedUser.id ? { ...cart, products: [] } : cart
      );
      setCartsDatabase(updatedCartsDatabase);
    }
  };

  const handleRemoveCartProduct = (index) => {
    const updatedProductsInCart = productsInCart.filter((_, i) => i !== index);
    setProductsInCart(updatedProductsInCart);

    const updatedCartContent = cartContent.filter((_, i) => i !== index);
    setCartContent(updatedCartContent);

    const updatedCartsDatabase = cartsDatabase.map((cart) =>
      cart.userId === loggedUser.id ? { ...cart, products: updatedCartContent } : cart
    );
    setCartsDatabase(updatedCartsDatabase);

    setActiveCart({ ...activeCart, products: updatedCartContent });

    let total = 0;
    updatedProductsInCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  return (
    <>
      <div className={`${styles.cartContainer} ${cartActive}`}>
        <div className={styles.closeIconContainer} onClick={handleCloseIcon}>
          <img className={styles.closeIcon} src="src\assets\Navbar\CloseIcon.svg" alt="Close Icon" />
        </div>
        <div className={styles.cartTitle}>Shopping Cart</div>
        <div className={styles.cartContent}>
          {productsInCart.map((product, index) => (
            <div key={index} className={styles.productContainer}>
              <div className={styles.removeCartProduct} onClick={() => handleRemoveCartProduct(index)}>
                <img src="src\assets\Navbar\CloseIcon.svg" alt="" />
              </div>
              <div className={styles.productImage}>
                <img src={product.image} alt="" />
              </div>
              <div className={styles.productTitle}>
                <span>{product.title}</span>
              </div>
              <div className={styles.productQuantity}>
                Qty: <span>{product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartCheckoutContainer}>
          <div className={styles.cartCheckoutTotal}>Total: ${totalPrice}</div>
          <div className={styles.cartCheckoutButton}>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;
