import React from "react";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Main from "./Main";

import "./App.css";

function App() {
  const data: any = useSelector((state) => state);
  const loginState = data.main.isLogin;
  console.log(loginState);
  return (
    <div className="container">
      {loginState ? <Main></Main> : <Login></Login>}
    </div>
  );
}

export default App;
