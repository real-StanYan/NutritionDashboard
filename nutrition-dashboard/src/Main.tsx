import React from "react";
import { Routes, Route } from "react-router-dom";

import Panel from "./components/Panel";
import Dashboard from "./pages/DashBoard";
import BodyMeasure from "./pages/BodyMeasure";
import UserInfor from "./pages/UserInfor";

export default function Main() {
  return (
    <div className="panel-container">
      <Panel></Panel>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="datas" element={<Dashboard />}></Route>
        <Route path="bodymeasure" element={<BodyMeasure />}></Route>
        <Route path="userinfor" element={<UserInfor />}></Route>
      </Routes>
    </div>
  );
}
