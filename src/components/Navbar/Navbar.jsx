/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./Navbar.module.css";
import cartOverlayStyles from "./../CartOverlay/CartOverlay.module.css";
import ordersOverlayStyles from "./../OrdersOverlay.jsx/OrdersOverlay.module.css";
import MyContext from "../../contexts/mycontexts";
import { useState, useEffect, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import CartOverlay from "./../CartOverlay/CartOverlay";
import OrdersOverlay from "../OrdersOverlay.jsx/OrdersOverlay";

const Navbar = ({ searchQuery, setSearchQuery, searchProducts }) => {
  const { isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser } = useContext(MyContext);
  const navigate = useNavigate();

  const [cartActive, setCartActive] = useState(null);
  const [ordersActive, setOrdersActive] = useState(null);

  const handleSearch = (e) => {
    if (setSearchQuery) setSearchQuery(e.target.value);
  };

  const handleSearchButton = () => {
    if (searchProducts) searchProducts();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser({});
  };

  const handleLogin = () => {
    if (!isLoggedIn) navigate("/login");
  };

  const handleToggleCart = () => {
    cartActive ? setCartActive(null) : setCartActive(cartOverlayStyles.cartContainerActive);
  };

  const handleToggleOrders = () => {
    ordersActive ? setOrdersActive(null) : setOrdersActive(ordersOverlayStyles.ordersContainerActive);
  };

  return (
    <>
      <nav id={styles.navbar}>
        <LinkContainer to="/">
          <div className={styles.logo}>Syopi</div>
        </LinkContainer>
        <div className={styles.navSearchbarContainer}>
          <input
            className={styles.navSearchbar}
            type="text"
            placeholder="Search Syopi"
            onChange={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && handleSearchButton()}
          />
          <button className={styles.navSearchButton} onClick={handleSearchButton}>
            <img src="src\assets\Navbar\SearchBarButtonIcon.svg" alt="Search Button Icon" />
          </button>
        </div>
        <div className={styles.navChildren}>
          {isLoggedIn ? (
            <div className={styles.navUser}>
              <p className={styles.navUserLoggedin}>
                Welcome Back, <span id={styles.navUsername}>{loggedUser.username}</span>!
              </p>
            </div>
          ) : (
            <LinkContainer to="/login">
              <div className={styles.navUser}>
                <Nav.Link onClick={handleLogin} className={styles.navUserLogin}>
                  Login
                </Nav.Link>
              </div>
            </LinkContainer>
          )}

          {isLoggedIn ? (
            <div className={styles.navOrders} onClick={handleToggleOrders}>
              Orders
            </div>
          ) : (
            <LinkContainer to="/login">
              <div className={styles.navOrders}>Orders</div>
            </LinkContainer>
          )}

          {isLoggedIn ? (
            <div className={styles.navCart} onClick={handleToggleCart}>
              Cart
            </div>
          ) : (
            <LinkContainer to="/login">
              <div className={styles.navCart}>Cart</div>
            </LinkContainer>
          )}

          {isLoggedIn ? (
            <div className={styles.navLogout} onClick={handleLogout}>
              <img src="src\assets\Navbar\LogoutIcon.svg" alt="" />
            </div>
          ) : null}
        </div>
        <CartOverlay cartActive={cartActive} setCartActive={setCartActive} />
        <OrdersOverlay ordersActive={ordersActive} setOrdersActive={setOrdersActive} />
      </nav>
    </>
  );
};

export default Navbar;
