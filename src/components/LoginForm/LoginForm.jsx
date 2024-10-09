/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styles from "./LoginForm.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import MyContext from "../../contexts/mycontexts";

const LoginForm = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    loggedUser,
    setLoggedUser,
    userDatabase,
    setUserDatabase,
    cartsDatabase,
    setCartsDatabase,
    activeCart,
    setActiveCart
  } = useContext(MyContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFlag, setUsernameFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);

  useEffect(() => {
    console.log(userDatabase);
  }, []);

  const handleChange = (e) => {
    e.target.name === "username" ? setUsername(e.target.value) : setPassword(e.target.value);
  };

  const findUser = () => {
    let usernameFound = false,
      passwordFound = false;
    const userFound = userDatabase.find((user) => {
      if (user.username === username) usernameFound = true;
      if (user.password === password) passwordFound = true;
      return usernameFound && passwordFound;
    });
    setUsernameFlag(!usernameFound);
    setPasswordFlag(!passwordFound);
    return userFound;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findUser()) {
      setIsLoggedIn(true);
      setLoggedUser({
        username: username.charAt(0).toUpperCase() + username.slice(1),
        id: userDatabase.find((user) => user.username === username).id
      });
      let userCart = cartsDatabase.find(
        (cart) => cart.userId === userDatabase.find((user) => user.username === username).id
      );
      if (userCart) setActiveCart(userCart);
      else {
        let lastCartId = cartsDatabase.length > 0 ? cartsDatabase[cartsDatabase.length - 1].id : 0;
        let newCartId = lastCartId + 1;
        let userId = userDatabase.find((user) => user.username === username).id;
        let newCart = { id: newCartId, userId: userId, products: [] };
        setCartsDatabase([...cartsDatabase, newCart]);
        setActiveCart(newCart);
      }
      console.log("Active Cart: ", activeCart);
      console.log(cartsDatabase);

      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.centerDiv}>
        <div className={styles.loginContainer}>
          <div className={styles.loginFormContainer}>
            <h1 className={`${styles.loginFormTitle}`}>Sign In</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <label className={`${styles.bold} ${styles.loginFormLabel}`}>Username</label>
              <input
                className={styles.loginFormInput}
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
              />
              {usernameFlag ? <label className={styles.errorCredentials}>Username not found.</label> : null}
              <label className={`${styles.bold} ${styles.loginFormLabel}`}>Password</label>
              <input
                className={styles.loginFormInput}
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              {passwordFlag ? <label className={styles.errorCredentials}>Password not found.</label> : null}
              <button className={styles.loginFormButton} type="submit">
                Continue
              </button>
            </form>
          </div>

          <div className={styles.registerLinkContainer}>
            <div>
              <div className={styles.lineDiv}></div>
              <div className={styles.registerLinkTitle}>New to Syopi?</div>
              <div className={styles.lineDiv}></div>
            </div>
            <LinkContainer to="/register">
              <button className={styles.registerLinkButton}>Create your Syopi account</button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
