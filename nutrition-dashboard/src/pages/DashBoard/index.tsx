import * as React from "react";

import Dount from "../../Charts/Dount";
import Table from "../../Charts/Table";

import "./index.css";

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="data-box">
        <Dount></Dount>
      </div>
      <div className="data-box"></div>
      <div className="data-box">
        <Table></Table>
      </div>
      <div className="data-box"></div>
    </div>
  );
}
