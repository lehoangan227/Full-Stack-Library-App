import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store"; // Import store trực tiếp
import axios from "axios";
import { doLoginAction, doLogoutAction } from "../redux/account/accountSlice";
import type { ApiResponse } from "../service/ApiService"; // Giả sử đường dẫn đúng

interface DecodedToken {
  exp: number;
  userId: number;
  sub: string;
  scope: string[];
}

// Biến toàn cục để giữ ID của timer, giúp clear khi cần
let refreshTokenTimerId: any = null;

const refreshTokenAPI = async (
  refreshToken: string
): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
  // Lưu ý: Đảm bảo URL này đúng, nên đưa vào env hoặc constant
  return await axios.post("http://localhost:8080/api/v1/library/auth/refresh", {
    refreshToken,
  });
};

export const doRefreshTokenIfNeeded = async () => {
  // 1. Clear timer cũ nếu có để tránh chạy chồng chéo
  if (refreshTokenTimerId) {
    clearTimeout(refreshTokenTimerId);
    refreshTokenTimerId = null;
  }

  // 2. Lấy state trực tiếp từ store (Không dùng hook)
  const state = store.getState();
  const token = state.account.user?.token;
  const refresh_Token = state.account.user?.refreshToken;

  if (token && refresh_Token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Tính thời gian còn lại (trừ hao 60s)
      const timeUntilRefresh = decodedToken.exp - currentTime - 60;

      if (timeUntilRefresh > 0) {
        console.log(`Token sẽ được refresh sau ${timeUntilRefresh} giây.`);

        // TRƯỜNG HỢP 1: Token chưa hết hạn -> Đặt lịch
        refreshTokenTimerId = setTimeout(async () => {
          await performRefresh(refresh_Token);
        }, timeUntilRefresh * 1000); // setTimeout tính bằng ms
      } else {
        // TRƯỜNG HỢP 2: Token đã hết hạn (hoặc sắp hết trong < 60s) -> Check refresh token
        const decodedRefreshToken: DecodedToken = jwtDecode(refresh_Token);

        if (decodedRefreshToken.exp > currentTime) {
          console.log("Token hết hạn, thực hiện refresh ngay lập tức.");
          await performRefresh(refresh_Token);
        } else {
          console.log("Cả 2 token đều hết hạn -> Logout.");
          store.dispatch(doLogoutAction()); // Dùng store.dispatch
        }
      }
    } catch (error) {
      console.error("Lỗi khi tính toán refresh token:", error);
      // Nếu giải mã lỗi (token rác) thì nên logout luôn
      store.dispatch(doLogoutAction());
    }
  }
};

// Hàm phụ để thực hiện gọi API và update Redux
const performRefresh = async (currentRefreshToken: string) => {
  try {
    const res = await refreshTokenAPI(currentRefreshToken);

    if (res && res.data) {
      // Cập nhật Redux (Tái sử dụng doLoginAction như ý bạn)
      store.dispatch(doLoginAction(res.data));

      // QUAN TRỌNG: Gọi lại chính hàm này để thiết lập timer cho token MỚI
      doRefreshTokenIfNeeded();
    }
  } catch (error) {
    console.error("Refresh token thất bại:", error);
    store.dispatch(doLogoutAction());
  }
};
