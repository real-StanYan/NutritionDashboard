import React from "react";

import "./index.css";

export default function Table() {
  return (
    <table className="table-wrapper">
      <tr>
        <th>Name</th>
        <th>Calorie</th>
        <th>Protein</th>
        <th>Fat</th>
        <th>Carbs</th>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
    </table>
  );
}
