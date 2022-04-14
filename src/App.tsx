import Cookies from "js-cookie";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import socket from "./config/socket";
import jwt_decode from "jwt-decode";

import { Auth, Profile } from "./pages";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setToken } from "./redux/tokenSlice";
import { addMessage } from "./redux/messageSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export type UserData = {
  id: number;
  username: string;
  password: string;
  email: string;
};

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.tokenSlice.token);
  React.useEffect(() => {
    const cookiesToken = Cookies.get("token");
    if (cookiesToken) {
      const decoded = jwt_decode(cookiesToken);
      socket.emit("connected", (decoded as any).data.id);
    }

    socket.on("get-message", (data) => {
      toast(`New message from: ${data.message.senderName}`);
      dispatch(addMessage({ message: data.message, type: "incomed" }));
    });

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
