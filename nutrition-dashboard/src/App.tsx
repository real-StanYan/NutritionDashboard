import React from "react";
import { useSelector } from "react-redux";

import Login from "./components/Login";

import "./App.css";

function App() {
  const data: any = useSelector((state) => state);
  const loginState = data.main.isLogin;
  return (
    <div className="container">
      {loginState ? <h1>123</h1> : <Login></Login>}
    </div>
  );
}

export default App;
