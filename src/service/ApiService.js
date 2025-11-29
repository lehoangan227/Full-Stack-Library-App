import axios from "../utils/AxiosCustomize";
const getListCategories = () => {
  return axios.get("api/v1/library/category");
};

const getBooksByCategory = (cateId) => {
  return axios.get(`api/v1/library/category/${cateId}/get-books`);
};
export { getListCategories, getBooksByCategory };
