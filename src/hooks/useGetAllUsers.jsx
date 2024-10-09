/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import DataService from "./../utils/DataService";

const useGetAllUsers = () => {
  const fetchAllUsers = async () => {
    const res = await DataService.getAllUsers();
    return res.data;
  };

  return fetchAllUsers;
};

export default useGetAllUsers;
