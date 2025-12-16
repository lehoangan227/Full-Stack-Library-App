import { BACKEND_URL } from "../../../util/constant";
import ReactPaginate from "react-paginate";
import "./BookSide.scss";
import { NavLink } from "react-router-dom";
const BookSide = (props: any) => {
  const {
    books,
    pageCount,
    currentPage,
    handlePageClick,
    searchParams,
    handlePageSizeChange,
    handleSortChange,
  } = props;
  const PaginateComponent = (ReactPaginate as any).default
    ? (ReactPaginate as any).default
    : ReactPaginate;
  return (
    <div className="card-book-container">
      <div className="sort-container">
        <div className="sort-title">Sắp xếp theo:</div>
        <div>
          <select
            value={searchParams.get("pageSize") || 8}
            onChange={handlePageSizeChange}
            className="sort-by-container"
          >
            <option value={8}>8 sản phẩm</option>
            <option value={12}>12 sản phẩm</option>
            <option value={16}>16 sản phẩm</option>
          </select>
        </div>
        <div>
          <select onChange={handleSortChange} className="sort-by-container">
            <option value="">Mặc định</option>
            <option value="bookTitle:asc">Tên sách A-Z</option>
            <option value="bookTitle:desc">Tên sách Z-A</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="list-book-container">
        {books && books.length > 0 ? (
          books.map((book: any) => (
            <div className="book-container" key={book.bookId}>
              <NavLink to={`/detail/${book.bookId}`}>
                <div className="book-image">
                  <img
                    src={`${BACKEND_URL}${book.bookImg}`}
                    alt={book.bookTitle}
                  />
                </div>
                <div className="book-info">
                  <div className="book-title">{book.bookTitle}</div>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="no-result-message">
            Không tìm thấy kết quả phù hợp
          </div>
        )}
      </div>
      <>
        {pageCount > 0 && (
          <PaginateComponent
            previousLabel="< Trước"
            nextLabel="Sau >"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            hrefAllControls
            forcePage={currentPage}
            onClick={(clickEvent: any) => {
              console.log("onClick", clickEvent);
              // Return false to prevent standard page change,
              // return false; // --> Will do nothing.
              // return a number to choose the next page,
              // return 4; --> Will go to page 5 (index 4)
              // return nothing (undefined) to let standard behavior take place.
            }}
          />
        )}
      </>
    </div>
  );
};

export default BookSide;
