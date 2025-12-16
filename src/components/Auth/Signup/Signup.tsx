import { NavLink } from "react-router-dom";
import "./Signup.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { useState } from "react";
import { signup, type ApiResponse } from "../../../service/ApiService";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [dob, setDob] = useState<string | null>(null);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };
  const handleSignup = async () => {
    const data = {
      username,
      password,
      email,
      fullname,
      phone,
      address,
      dob,
    };
    setIsLoading(true);
    const res = await signup(data);
    console.log("res", res);
    setIsLoading(false);
    if (res.code === "user.create.success") {
      toast.success("Đăng ký thành công!");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="signup-container">
      <div className="form-signup">
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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="phone-and-dob">
          <div className="form-group">
            <label>Điện thoại</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group">
            <label>Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <div className="password-input">
            <input
              type={hidePassword ? "password" : "text"}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Tôi đồng ý với các điều khoản dịch vụ
          </label>
        </div>
        <div className="btn-container">
          <button
            onClick={() => handleSignup()}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            &nbsp;Đăng ký
          </button>
        </div>
        <div>
          <NavLink to={"/login"} className="login-link">
            Đã có tài khoản? Đăng nhập ngay
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Signup;
