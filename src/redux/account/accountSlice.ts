// src/redux/account/accountSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Định nghĩa kiểu dữ liệu cho User (dựa vào response API của bạn)
interface UserData {
  token: string;
  refreshToken: string;
  // Thêm các trường khác nếu có: fullName, email, avatar...
}

// 2. Định nghĩa kiểu dữ liệu cho State của Slice này
interface AccountState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
}

// 3. Giá trị khởi tạo mặc định
const initialState: AccountState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Hành động khi đăng nhập thành công
    doLoginAction: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload; // Gán dữ liệu user từ API vào Redux
    },
    // Hành động lấy thông tin user (nếu cần reload trang)
    doGetAccountAction: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    // Hành động đăng xuất
    doLogoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Xóa token ở localStorage nếu cần thiết tại đây
    },
  },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } =
  accountSlice.actions;

export default accountSlice.reducer;
