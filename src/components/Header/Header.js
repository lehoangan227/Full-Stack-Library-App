import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getListCategories } from "../../service/ApiService";

const Header = () => {
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const res = await getListCategories();
    if (res && res.data) {
      setListCategories(res.data.items);
    }
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
            <form>
              <div className="search">
                <input placeholder="Search books" />
                <button>
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

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="#/action-1">Sign in</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Sign up</Dropdown.Item>
                </Dropdown.Menu>
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
                  listCategories.map((cate, index) => {
                    return (
                      <Dropdown.Item
                        className="dropdown-item"
                        key={cate.cateId}
                        href="#/action-1"
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
