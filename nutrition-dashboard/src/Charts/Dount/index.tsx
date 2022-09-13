import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./index.css";

export default function Dount() {
  const data: any = useSelector((state) => state);
  const calorie = data.main.nutritions.calorie;
  const protein = data.main.nutritions.protein;
  const fat = data.main.nutritions.fat;
  const carbs = data.main.nutritions.carbs;
  const [dkcal, setdKcal] = useState(0);
  const [dprotein, setdProtein] = useState(0);
  const [dfat, setdFat] = useState(0);
  const [dcarbs, setdCarbs] = useState(0);
  const eatList = JSON.parse(localStorage.getItem("eatList") as any);

  useEffect(() => {
    eatList.forEach((item: any) => {
      setdKcal(dkcal + item.kcal);
      setdProtein(dprotein + item.protein);
      setdFat(dfat + item.fat);
      setdCarbs(dcarbs + item.carbs);
    });
  }, []);

  return (
    <div className="dount-wrapper">
      {/* #1 Calorie*/}
      <div className="svg-item">
        <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
          <circle
            className="donut-hole"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="#0A1929"
          ></circle>
          <circle
            className="donut-ring"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-width="3.5"
          ></circle>
          <circle
            className="donut-segment-1"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-linecap="round"
            stroke-width="3.5"
            stroke-dasharray="0 100" //Process bar
            stroke-dashoffset="25"
          ></circle>
          <g>
            <text y="50%" transform="translate(0, 2)" fill="aliceblue">
              <tspan x="50%" text-anchor="middle" className="donut-percent">
                Calorie <tspan>0%</tspan>
              </tspan>
            </text>
          </g>
        </svg>
        <h1 className="dount-count">--/{calorie}</h1>
      </div>
      {/* #2 Protein*/}
      <div className="svg-item">
        <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
          <circle
            className="donut-hole"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="#0A1929"
          ></circle>
          <circle
            className="donut-ring"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-width="3.5"
          ></circle>
          <circle
            className="donut-segment-2"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-linecap="round"
            stroke-width="3.5"
            stroke-dasharray="0 100" //Process bar
            stroke-dashoffset="25"
          ></circle>
          <g>
            <text y="50%" transform="translate(0, 2)" fill="aliceblue">
              <tspan x="50%" text-anchor="middle" className="donut-percent">
                Protein 0<tspan>%</tspan>
              </tspan>
            </text>
          </g>
        </svg>
        <h1 className="dount-count">--/{protein}</h1>
      </div>
      {/* #3 Fat*/}
      <div className="svg-item">
        <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
          <circle
            className="donut-hole"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="#0A1929"
          ></circle>
          <circle
            className="donut-ring"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-width="3.5"
          ></circle>
          <circle
            className="donut-segment-3"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-linecap="round"
            stroke-width="3.5"
            stroke-dasharray="0 100" //Process bar
            stroke-dashoffset="25"
          ></circle>
          <g>
            <text y="50%" transform="translate(0, 2)" fill="aliceblue">
              <tspan x="50%" text-anchor="middle" className="donut-percent">
                Fat 0<tspan>%</tspan>
              </tspan>
            </text>
          </g>
        </svg>
        <h1 className="dount-count">--/{fat}</h1>
      </div>
      {/* #4 Carbs*/}
      <div className="svg-item">
        <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
          <circle
            className="donut-hole"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="#0A1929"
          ></circle>
          <circle
            className="donut-ring"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-width="3.5"
          ></circle>
          <circle
            className="donut-segment-4"
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="transparent"
            stroke-linecap="round"
            stroke-width="3.5"
            stroke-dasharray="0 100" //Process bar
            stroke-dashoffset="25"
          ></circle>
          <g>
            <text y="50%" transform="translate(0, 2)" fill="aliceblue">
              <tspan x="50%" text-anchor="middle" className="donut-percent">
                Carbs 0<tspan>%</tspan>
              </tspan>
            </text>
          </g>
        </svg>
        <h1 className="dount-count">--/{carbs}</h1>
      </div>
    </div>
  );
}
