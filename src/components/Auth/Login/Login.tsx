import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { useState } from "react";
import { getToken } from "../../../service/ApiService";
import { useAppDispatch } from "../../../redux/hook";
import { doLoginAction } from "../../../redux/account/accountSlice";
import { doRefreshTokenIfNeeded } from "../../../util/tokenService";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    // 1. Validate input
    if (!username) {
      toast.error("Vui lòng nhập tài khoản!");
      return;
    }
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    setIsLoading(true);
    const response = await getToken(username, password);
    setIsLoading(false);
    console.log("response", response);
    if (response && response.code === "auth.login.success") {
      // localStorage.setItem("access_token", response.data.token);
      // 2. Lưu thông tin vào Redux Store
      dispatch(doLoginAction(response.data));
      doRefreshTokenIfNeeded();
      // 3. Chuyển hướng về trang chủ
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="form-login">
        <NavLink to={"/"} className="logo-container">
          <FaBook className="logo" />
          <span>AnBook</span>
        </NavLink>
        <div className="form-group">
          <label>Tài khoản</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <div className="password-input">
            <input
              type={hidePassword ? "password" : "text"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span
              className="toggle-password"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Ghi nhớ đăng nhập
          </label>
        </div>
        <div className="btn-container">
          <button
            onClick={() => handleLogin()}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            &nbsp;Đăng nhập
          </button>
        </div>
        <div>
          <NavLink to={"/signup"} className="signup-link">
            Chưa có tài khoản? Đăng ký ngay
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
