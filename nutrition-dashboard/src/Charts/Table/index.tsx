import React from "react";

import "./index.css";

export default function Table() {
  const eatList = JSON.parse(localStorage.getItem("eatList") as any);

  return (
    <table className="table-wrapper">
      <tr>
        <th>Name</th>
        <th>kCal</th>
        <th>Protein</th>
        <th>Fat</th>
        <th>Carbs</th>
      </tr>
      {eatList.map((item: any, index: number) => {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.kcal}</td>
            <td>{item.protein}</td>
            <td>{item.fat}</td>
            <td>{item.carbs}</td>
          </tr>
        );
      })}
    </table>
  );
}
