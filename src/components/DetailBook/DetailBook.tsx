import { useParams } from "react-router-dom";
import "./DetailBook.scss";
import { useEffect, useState } from "react";
import { getCategory, getDetailBook } from "../../service/ApiService";
import { BACKEND_URL } from "../../util/constant";
import type { CategoryType } from "../HomePage/Category/Category";
import Category from "../HomePage/Category/Category";
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
const DetailBook = () => {
  const [bookInfo, setBookInfo] = useState<DetailBook | null>(null);
  const [listCategories, setListCategories] = useState<CategoryType[]>([]);
  const bookId = useParams().bookId;
  useEffect(() => {
    fetchBook();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookId]);

  const fetchBook = async () => {
    const res = await getDetailBook(bookId!);
    if (res.data) {
      setBookInfo(res.data);
      const categoryPromises = res.data.cateIds.map(async (cateId) => {
        const cateRes = await getCategory(cateId);
        return cateRes.data; // Trả về data (có thể là null nếu lỗi)
      });

      // 2. Đợi tất cả các Promises hoàn thành
      const results = await Promise.all(categoryPromises);

      // 3. Lọc bỏ các giá trị null/undefined (nếu API có lỗi) và set state một lần duy nhất
      const validCategories = results.filter(
        (cate): cate is CategoryType => cate !== null
      );
      setListCategories(validCategories);
    }
  };

  return (
    <>
      {bookInfo ? (
        <div className="detail-book-container">
          <div className="content-body">
            <div className="image-section">
              <div className="image-container">
                <img
                  src={`${BACKEND_URL}${bookInfo.bookImg}`}
                  alt="Book cover"
                />
              </div>
            </div>
            <div className="info-section">
              <div className="info-section-1">
                <div className="book-title">{bookInfo.bookTitle}</div>
                <div className="short-info-container">
                  <div className="book-publisher">
                    Nhà xuất bản: <span>{bookInfo?.publisher}</span>
                  </div>
                  <div className="book-author">
                    Tác giả: <span>{bookInfo?.authors}</span>
                  </div>
                  <div className="book-category">
                    Thể loại:{" "}
                    <span>
                      {listCategories.map((cate) => cate.cateName).join(", ")}
                    </span>
                  </div>
                </div>
                <button>Thêm vào giỏ hàng</button>
              </div>
              <div className="info-section-2">
                <div className="info-container">
                  <div className="single-info">
                    <div className="info-label">Nhà xuất bản:</div>
                    <div className="info-content">
                      <span>{bookInfo?.publisher}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="single-info">
                    <div className="info-label">Số trang:</div>
                    <div className="info-content">
                      <span>{bookInfo?.pageCount}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="single-info">
                    <div className="info-label">Kiểu in:</div>
                    <div className="info-content">
                      <span>{bookInfo?.printType}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="single-info">
                    <div className="info-label">Ngôn ngữ:</div>
                    <div className="info-content">
                      <span>{bookInfo?.language}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="single-info">
                    <div className="info-label">Tác giả:</div>
                    <div className="info-content">
                      <span>{bookInfo?.authors}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="single-info">
                    <div className="info-label">Thể loại:</div>
                    <div className="info-content">
                      <span>
                        {listCategories.map((cate) => cate.cateName).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-section-3">
                <div className="description-container">
                  <div className="description-title">Mô tả sách</div>
                  <div className="description-content">
                    {bookInfo?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="related-book">
            <div className="title-related-book">Các sách cùng thể loại</div>
            {listCategories &&
              listCategories.length > 0 &&
              listCategories.map((category) => (
                <Category key={category.cateId} category={category} />
              ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default DetailBook;
