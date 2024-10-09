/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyContext from "./contexts/mycontexts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import useGetAllUsers from "./hooks/useGetAllUsers";
import useGetAllCarts from "./hooks/useGetAllCarts";

const App = () => {
  const fetchAllUsers = useGetAllUsers();
  const getAllCarts = useGetAllCarts();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [userDatabase, setUserDatabase] = useState([]);
  const [cartsDatabase, setCartsDatabase] = useState([]);
  const [activeCart, setActiveCart] = useState(null);
  const [ordersDatabase, setOrdersDatabase] = useState([]);

  useEffect(() => {
    getAllCarts().then((res) => {
      setCartsDatabase(res);
    });
    fetchAllUsers().then((res) => {
      setUserDatabase(res);
    });
  }, []);

  return (
    <>
      <MyContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          loggedUser,
          setLoggedUser,
          userDatabase,
          setUserDatabase,
          cartsDatabase,
          setCartsDatabase,
          activeCart,
          setActiveCart,
          ordersDatabase,
          setOrdersDatabase
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default App;
