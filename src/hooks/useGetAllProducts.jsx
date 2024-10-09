import DataService from "../utils/DataService";

const useGetAllProducts = () => {
  const getAllProducts = async () => {
    const response = await DataService.getAllProducts();
    return response.data;
  };

  return getAllProducts;
};

export default useGetAllProducts;
