import { NavLink } from "react-router-dom";
import "./FilterSide.scss";
const FilterSide = (props: any) => {
  const {
    listCategories,
    publishers,
    languages,
    searchParams,
    handleFiterChange,
    handleCateLink,
  } = props;
  return (
    <div className="nav-filter-container">
      <div className="category-filter-container item">
        <div className="title-filter">Thể Loại</div>
        <div className="item-filter-container">
          {listCategories &&
            listCategories.length > 0 &&
            listCategories.map((category) => (
              
                <NavLink
                  key={category.cateId}
                  to={handleCateLink(category.cateId)}
                  className={
                    category.cateId == searchParams.get("cateId")
                      ? "nav-link active-style"
                      : "nav-link"
                  }
                >
                  {category.cateName}
                </NavLink>
              
            ))}
        </div>
      </div>
      <hr />
      <div className="price-filter-container item">
        <div className="title-filter">Giá</div>
        <div className="item-filter-container checkbox-container">
          <div>
            <input type="checkbox" value="Bike" />
            <label> 0đ - 150,000đ</label>
            <br></br>
          </div>
          <div>
            <input type="checkbox" value="Bike" />
            <label> 150,000đ - Trở Lên</label>
            <br></br>
          </div>
        </div>
      </div>
      <hr />
      <div className="publisher-filter-container item">
        <div className="title-filter">Nhà Xuất Bản</div>
        <div className="item-filter-container checkbox-container">
          {publishers &&
            publishers.length > 0 &&
            publishers.map((publisher, index) => (
              <div key={index}>
                <input
                  id={`publisher-${index}`}
                  type="checkbox"
                  value={publisher}
                  checked={searchParams.get("publisher") === publisher}
                  onChange={(e) =>
                    handleFiterChange(
                      "publisher",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor={`publisher-${index}`}> {publisher}</label>
                <br></br>
              </div>
            ))}
        </div>
      </div>
      <hr />
      <div className="language-filter-container item">
        <div className="title-filter">Ngôn Ngữ</div>
        <div className="item-filter-container checkbox-container">
          {languages &&
            languages.length > 0 &&
            languages.map((language, index) => (
              <div key={index}>
                <input
                  id={`language-${index}`}
                  type="checkbox"
                  value={language}
                  checked={searchParams.get("language") === language}
                  onChange={(e) =>
                    handleFiterChange(
                      "language",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor={`language-${index}`}> {language}</label>
                <br></br>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default FilterSide;
