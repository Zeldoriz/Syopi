import DataService from "../utils/DataService";

const useGetAllCarts = () => {
  const getAllCarts = async () => {
    try {
      const response = await DataService.getAllCarts();
      return response.data;
    } catch (error) {
      console.error("useGetAllCarts -> getAllCarts", error);
      return [];
    }
  };

  return getAllCarts;
};

export default useGetAllCarts;
