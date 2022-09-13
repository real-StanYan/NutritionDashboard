import React from "react";
import { useSelector } from "react-redux";

import "./index.css";

export default function BodyMeasure() {
  const data: any = useSelector((state) => state);
  const BMI = +data.main.BMI;
  const bodyMeasured = data.main.bodyMeasured;
  return (
    <div className="bodymeasure-wrapper">
      <table className="box">
        <div
          className="box-unavailable"
          style={{ display: bodyMeasured === true ? "none" : "flex" }}
        >
          <h1>Body Data Not Detected</h1>
        </div>
        <tr style={{ display: bodyMeasured === true ? "" : "none" }}>
          <th>Your BMI: {BMI}</th>
          <th>BMI Range</th>
        </tr>
        <tr
          className={BMI && BMI <= 18.4 ? "active" : ""}
          style={{ display: bodyMeasured === true ? "" : "none" }}
        >
          <td>Thin</td>
          <td>{`<= 18.4`}</td>
        </tr>
        <tr
          className={18.5 <= BMI && BMI <= 23.9 ? "active" : ""}
          style={{ display: bodyMeasured === true ? "" : "none" }}
        >
          <td>Normal</td>
          <td>{`18.5 ~ 23.9`}</td>
        </tr>
        <tr
          className={24.0 <= BMI && BMI <= 27.9 ? "active" : ""}
          style={{ display: bodyMeasured === true ? "" : "none" }}
        >
          <td>Over Weight</td>
          <td>{`24.0 ~ 27.9`}</td>
        </tr>
        <tr
          className={BMI >= 28 ? "active" : ""}
          style={{ display: bodyMeasured === true ? "" : "none" }}
        >
          <td style={{ border: "none" }}>Obesity</td>
          <td style={{ border: "none" }}>{`>= 28.0`}</td>
        </tr>
      </table>
      <div className="box">1</div>
      <div className="box">1</div>
      <div className="box">1</div>
    </div>
  );
}
