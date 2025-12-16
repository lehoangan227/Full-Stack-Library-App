import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Mặc định là lưu vào localStorage
import accountReducer from "./account/accountSlice";
const storageEngine = (storage as any).default
  ? (storage as any).default
  : storage;
// 1. Cấu hình persist
const persistConfig = {
  key: "root", // Tên key dùng để lưu trong localStorage (ví dụ: persist:root)
  version: 1,
  storage: storageEngine, // Loại storage (localStorage)
  whitelist: ["account"], // Quan trọng: Chỉ định slice nào muốn lưu (ở đây là 'account')
  // blacklist: ['somethingElse'] // Nếu muốn loại trừ slice nào đó
};

// 2. Gom nhóm các reducer lại (nếu sau này có nhiều slice thì thêm vào đây)
const rootReducer = combineReducers({
  account: accountReducer,
});

// 3. Tạo reducer đã được "bọc" tính năng persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Bắt buộc phải thêm dòng này để Redux không báo lỗi khi gặp các action của redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Export persistor để dùng ở file main
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
