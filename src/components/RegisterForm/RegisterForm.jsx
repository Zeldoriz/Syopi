/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styles from "./RegisterForm.module.css";
import borrowedStyles from "../LoginForm/LoginForm.module.css";
import { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import MyContext from "./../../contexts/mycontexts";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const { userDatabase, setUserDatabase } = useContext(MyContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [usernameFlag, setUsernameFlag] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);

  const userExists = (username, email) => {
    let usernameExists = false,
      emailExists = false;
    for (let user of userDatabase) {
      if (user.username === username) usernameExists = true;
      if (user.email === email) emailExists = true;
    }
    setUsernameFlag(usernameExists), setEmailFlag(emailExists);
    return usernameExists || emailExists;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password-check":
        setPasswordCheck(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordCheck) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        if (!userExists(username, email)) {
          let lastUserId = userDatabase.length > 0 ? userDatabase[userDatabase.length - 1].id : 0;
          let newUserId = lastUserId + 1;
          setUserDatabase([...userDatabase, { id: newUserId, username: username, email: email, password: password }]);
          alert("Account created successfully!\nRedirecting to login page...");
          navigate("/login");
        }
      }
    }
  };

  return (
    <>
      <div className={styles.centerDiv}>
        <div className={styles.registerContainer}>
          <div className={styles.registerFormContainer}>
            <h1 className={styles.registerFormTitle}>Create account</h1>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
              <label className={`${borrowedStyles.bold} ${styles.registerFormLabel}`}>Username</label>
              <input
                className={styles.registerFormInput}
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {usernameFlag ? <span className={styles.errorCredentials}>Username is taken!</span> : null}
              <label className={`${borrowedStyles.bold} ${styles.registerFormLabel}`}>Email</label>
              <input
                className={styles.registerFormInput}
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {emailFlag ? <span className={styles.errorCredentials}>Email is taken!</span> : null}
              {email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? (
                <span className={styles.errorCredentials}>Invalid email format!</span>
              ) : null}
              <label className={`${borrowedStyles.bold} ${styles.registerFormLabel}`}>Password</label>
              <input
                className={styles.registerFormInput}
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <label className={`${borrowedStyles.bold} ${styles.registerFormLabel}`}>Re-enter Password</label>
              <input
                className={styles.registerFormInput}
                type="password"
                name="password-check"
                value={passwordCheck}
                onChange={handleChange}
              />
              <button className={styles.registerFormButton} type="submit">
                Continue
              </button>
            </form>
          </div>

          <div className={styles.loginLinkContainer}>
            <div>
              <div className={styles.lineDiv}></div>
              <div className={styles.loginLinkTitle}>Already have an account?</div>
              <div className={styles.lineDiv}></div>
            </div>
            <LinkContainer to="/login">
              <button className={styles.loginLinkButton}>Sign in</button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
