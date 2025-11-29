import { getBooksByCategory } from "../../../service/ApiService";
import "./Category.scss";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../utils/constant";

const Category = (props) => {
  const { category } = props;
  const [books, setBooks] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const carouselRef = useRef(null);

  const fetchBooks = async () => {
    const res = await getBooksByCategory(category.cateId);
    if (res && res.data) {
      setBooks(res.data.items);
      setTotalElement(res.data.totalElements);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="category-section">
      <div className="category-header">
        <div className="title-group">
          <img
            src={`${BACKEND_URL}${category.cateImg}`}
            alt="Logo"
            className="logo"
          />
          <h2>{category.cateName}</h2>
        </div>
        <div className="navigation">
          <a href="#" className="view-all">
            View All ({totalElement})
          </a>
          <button className="nav-btn" onClick={() => handleScroll("left")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="nav-btn" onClick={() => handleScroll("right")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="carousel-container">
        <div className="books-carousel" ref={carouselRef}>
          {books &&
            books.length > 0 &&
            books.map((book) => (
              <div key={book.bookId} className="book-card">
                <img
                  src={`${BACKEND_URL}${book.bookImg}`}
                  alt={book.bookTitle}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Category;
