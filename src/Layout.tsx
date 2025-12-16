import { Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage/HomePage";
import ListBook from "./components/ListBook/ListBook";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import { useAppSelector } from "./redux/hook";
import { useEffect } from "react";
import { doRefreshTokenIfNeeded } from "./util/tokenService";
import { Bounce, ToastContainer } from "react-toastify";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import DetailBook from "./components/DetailBook/DetailBook";
import LoginAdmin from "./components/Admin/Login/LoginAdmin";
import LayoutAdmin from "./components/Admin/LayoutAdmin/LayoutAdmin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
const Layout = () => {
  // Lấy trạng thái đăng nhập để theo dõi
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    // Nếu người dùng đang đăng nhập (kể cả vừa F5 xong và Redux Persist nạp lại data)
    // Thì kích hoạt lại bộ đếm giờ
    if (isAuthenticated) {
      doRefreshTokenIfNeeded();
    }
  }, [isAuthenticated]); // Chạy lại mỗi khi trạng thái login thay đổi
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="book" element={<ListBook />} />
          <Route path="detail/:bookId" element={<DetailBook />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default Layout;
