import Cookies from "js-cookie";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Auth, Profile } from "./pages";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setToken } from "./redux/tokenSlice";

export type UserData = {
  username: string;
  password: string;
  email: string;
};

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.tokenSlice.token);

  React.useEffect(() => {
    const cookiesToken = Cookies.get("token");

    dispatch(setToken(cookiesToken ?? ""));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={token ? <Navigate to="/profile" /> : <Auth />}
          />

          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
