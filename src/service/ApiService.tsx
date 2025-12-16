import type { CategoryType } from "../components/HomePage/Category/Category";
import axios from "../util/AxiosCustomize";
import { cleanParam } from "../util/CommonFunc";

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}
interface SignupData {
  username: string;
  password: string;
  fullName?: string | null;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  dob?: string | null;
}
interface DetailBook {
  bookTitle: string;
  authors: string;
  publisher: string;
  cateIds: number[];
  description: string;
  pageCount: number;
  language: string;
  printType: string;
  bookImg: string;
}

const getListCategories = () => {
  return axios.get("api/v1/library/category");
};

const getBooks = (params: any) => {
  const newParams = cleanParam(params);
  return axios.get("api/v1/library/book", { params: newParams });
};

const getAllPublishers = () => {
  return axios.get("api/v1/library/book/get-publishers");
};

const getAllLanguages = () => {
  return axios.get("api/v1/library/book/get-languages");
};

const getToken = (
  username: string,
  password: string
): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
  return axios.post("api/v1/library/auth/token", { username, password });
};

const signup = (data: SignupData): Promise<ApiResponse<{}>> => {
  return axios.post("api/v1/library/user/create", data);
};

const getDetailBook = (bookId: string): Promise<ApiResponse<DetailBook>> => {
  return axios.get(`api/v1/library/book/detail/${bookId}`);
};

const getCategory = (cateId: number): Promise<ApiResponse<CategoryType>> => {
  return axios.get(`api/v1/library/category/detail/${cateId}`);
};

const loginAdmin = (
  username: string,
  password: string
): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
  return axios.post("api/v1/library/auth/login-admin", { username, password });
};

export {
  getListCategories,
  getBooks,
  getAllPublishers,
  getAllLanguages,
  getToken,
  signup,
  getDetailBook,
  getCategory,
  loginAdmin,
};
