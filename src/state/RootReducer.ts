import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import ApplicationReducer from "./User/Reducer";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const appReducer = combineReducers({
  applicationState: ApplicationReducer,
});

const rootReducer = (state: any, action: any): any => {
  if (action.type === "AUTH_LOGOUT_USER" || action.type === "RESET_STORE") {
    storage.removeItem("persist:userPannel");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig = {
  key: "userPannel",
  storage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Optional: Expose for debugging
(window as any).store = store;

export const persistor = persistStore(store);
export default store;
