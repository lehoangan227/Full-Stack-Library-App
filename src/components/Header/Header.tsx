import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getListCategories } from "../../service/ApiService";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { store } from "../../redux/store";
import { doLogoutAction } from "../../redux/account/accountSlice";

interface Category {
  cateId: string | number;
  cateName: string;
}

const Header = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const res = await getListCategories();
    if (res && res.data) {
      setListCategories(res.data.items);
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
      params.delete("pageNo");
    } else {
      params.delete("keyword");
    }
    console.log("Current search params:", params.toString());
    navigate(`/book?${params.toString()}`);
  };
  return (
    <div className="header-root">
      <div className="header-container">
        <div className="header">
          <NavLink to={"/"} className="logo-container">
            <FaBook className="logo" />
            <span>AnBook</span>
          </NavLink>
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <div className="search">
                <input
                  placeholder="Search books"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <IoSearchOutline />
                </button>
              </div>
            </form>
          </div>
          <div className="user-container">
            <div className="user">
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  className="user-dropdown"
                  id="dropdown-basic"
                >
                  <FaRegUser className="user-icon" />
                </Dropdown.Toggle>
                {isAuthenticated ? (
                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => store.dispatch(doLogoutAction())}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/login">Sign in</Dropdown.Item>
                    <Dropdown.Item href="/signup">Sign up</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="nav-container">
          <NavLink to={"/"} className="nav-item-container">
            <p className="nav-item">Home</p>
          </NavLink>
          <div className="nav-item-container">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="category-dropdown"
                id="dropdown-basic"
              >
                <span className="nav-item">Category</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                {listCategories && listCategories.length > 0 ? (
                  listCategories.map((cate) => {
                    return (
                      <Dropdown.Item
                        className="dropdown-item"
                        key={cate.cateId}
                        href={`/book?cateId=${cate.cateId}`}
                      >
                        {cate.cateName}
                      </Dropdown.Item>
                    );
                  })
                ) : (
                  <Dropdown.Item>No categories found</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <NavLink to={""} className="nav-item-container">
            <p className="nav-item">Author</p>
          </NavLink>
          <NavLink to={""} className="nav-item-container">
            <p className="nav-item">Cate</p>
          </NavLink>
          <NavLink to={""} className="nav-item-container">
            <p className="nav-item">Logo</p>
          </NavLink>
          <NavLink to={""} className="nav-item-container">
            <p className="nav-item">Abc</p>
          </NavLink>
        </div>
      </div>
      <div className="sale-notify">
        <p>
          Discount <span>20%</span> For Christmas
        </p>
      </div>
    </div>
  );
};
export default Header;
