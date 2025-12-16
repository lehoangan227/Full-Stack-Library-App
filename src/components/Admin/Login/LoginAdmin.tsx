import { FaBook } from "react-icons/fa";
/*
file scss của component Login bị áp dụng cho cả component LoginAdmin do cả 2 component đều dùng cùng
các class toàn cục như login-container, form-login, form-group, form-control, btn, spinner-border… nên
khi bạn chỉnh Login.scss, các selector trùng khớp sẽ áp dụng cho markup của LoginAdmin
*/
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLoginAction } from "../../../redux/account/accountSlice";
import { doRefreshTokenIfNeeded } from "../../../util/tokenService";
import { loginAdmin } from "../../../service/ApiService";
const LoginAdmin = () => {
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
    const response = await loginAdmin(username, password);
    setIsLoading(false);
    console.log("response", response);
    if (response && response.code === "auth.login-admin.success") {
      // localStorage.setItem("access_token", response.data.token);
      // 2. Lưu thông tin vào Redux Store
      dispatch(doLoginAction(response.data));
      doRefreshTokenIfNeeded();
      // 3. Chuyển hướng về trang chủ
      toast.success("Đăng nhập thành công!");
      navigate("/admin/dashboard");
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
        <div className="logo-container">
          <FaBook className="logo" />
          <span>AnBook - Admin</span>
        </div>
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
      </div>
    </div>
  );
};
export default LoginAdmin;
