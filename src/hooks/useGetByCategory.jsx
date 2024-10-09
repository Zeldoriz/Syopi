import DataService from "../utils/DataService";

const useGetByCategory = () => {
  const getByCategory = async (category) => {
    return await DataService.getByCategory(category);
  };
  return getByCategory;
};

export default useGetByCategory;
