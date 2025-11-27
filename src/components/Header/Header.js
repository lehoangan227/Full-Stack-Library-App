import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

const Header = () => {
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
          <div className="nav-item">
            <p>Home</p>
          </div>
          <div className="nav-item">
            <p>Page</p>
          </div>
          <div className="nav-item">
            <p>Author</p>
          </div>
          <div className="nav-item">
            <p>Cate</p>
          </div>
          <div className="nav-item">
            <p>Logo</p>
          </div>
          <div className="nav-item">
            <p>Abc</p>
          </div>
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
