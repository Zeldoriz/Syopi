import { useCallback } from "react";
import DataService from "../utils/DataService";

const useLogin = () => {
  const login = useCallback(({ username, password }) => {
    return DataService.login({ username, password })
      .then((response) => {
        return { data: response.data, error: null };
      })
      .catch((e) => {
        return { data: null, error: e };
      });
  }, []);

  return login;
};
export default useLogin;
