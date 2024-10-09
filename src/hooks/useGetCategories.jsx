import DataService from "../utils/DataService";

const useGetCategories = () => {
  const getCategories = async () => {
    const response = await DataService.getCategories();
    return response;
  };

  return getCategories;
};

export default useGetCategories;
