import { useEffect, useState, type HTMLAttributes } from "react";
import "./ListBook.scss";
import {
  getAllLanguages,
  getAllPublishers,
  getBooks,
  getListCategories,
} from "../../service/ApiService";
import { useSearchParams } from "react-router-dom";
import BookSide from "./BookSide/BookSide";
import FilterSide from "./FilterSide/FilterSide";
import type { Book, CategoryType } from "../HomePage/Category/Category";
const ListBook = () => {
  const [listCategories, setListCategories] = useState<CategoryType[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  useEffect(() => {
    fetchCategories();
    fetPublishers();
    fetLanguages();
  }, []);
  useEffect(() => {
    const param = {
      cateId: searchParams.get("cateId"),
      pageNo: searchParams.get("pageNo"),
      pageSize: searchParams.get("pageSize"),
      sorts: searchParams.get("sorts"),
      keyword: searchParams.get("keyword"),
      language: searchParams.get("language"),
      publisher: searchParams.get("publisher"),
    };
    fetchBooks(param);
    const pageFromUrl = searchParams.get("pageNo")
      ? parseInt(searchParams.get("pageNo")!)
      : 0;

    setCurrentPage(pageFromUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams.toString()]);
  const fetchCategories = async () => {
    const res = await getListCategories();
    if (res && res.data) {
      setListCategories(res.data.items);
    }
  };
  const fetchBooks = async (param: any) => {
    const res = await getBooks(param);
    if (res && res.data) {
      setBooks(res.data.items);
      setPageCount(res.data.totalPage);
    }
  };
  const fetPublishers = async () => {
    const res = await getAllPublishers();
    if (res && res.data && res.data.length > 0) {
      setPublishers(res.data);
    }
  };
  const fetLanguages = async () => {
    const res = await getAllLanguages();
    if (res && res.data && res.data.length > 0) {
      setLanguages(res.data);
    }
  };
  const handleCateLink = (cateId: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("cateId", cateId.toString());
    newParams.delete("pageNo");
    return `/book?${newParams.toString()}`;
  };
  const handleFiterChange = (key: string, value: string, isChecked: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (isChecked) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete("pageNo");
    setSearchParams(newParams);
  };
  const handlePageClick = (event: any) => {
    const selectedPage = event.selected;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pageNo", selectedPage);
    setCurrentPage(selectedPage);
    setSearchParams(newParams);
  };
  const handlePageSizeChange = (event: any) => {
    const newSize = event.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pageSize", newSize);
    newParams.delete("pageNo");
    setSearchParams(newParams);
  };
  const handleSortChange = (e: any) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("sorts", value);
    } else {
      newParams.delete("sorts");
    }
    newParams.delete("pageNo");
    setSearchParams(newParams);
  };
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <div className="list-book-page-container">
        <FilterSide
          listCategories={listCategories}
          publishers={publishers}
          languages={languages}
          searchParams={searchParams}
          handleFiterChange={handleFiterChange}
          handleCateLink={handleCateLink}
        />
        <BookSide
          books={books}
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          searchParams={searchParams}
          handlePageSizeChange={handlePageSizeChange}
          handleSortChange={handleSortChange}
        />
      </div>
    </div>
  );
};
export default ListBook;
