import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

export default function CustomizedRecipes() {
  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8888/foods")
      .then((res: any) => {
        console.log(res);
        setFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <table className="recipes-wrapper">
      <tr>
        <th>Name</th>
        <th>kcal</th>
        <th>protein</th>
        <th>fat</th>
        <th>carbs</th>
        <th>Eat?</th>
      </tr>
      {foodList.map((item: any) => {
        return (
          <tr key={item}>
            <td>{item.name}</td>
            <td>{item.kcal}</td>
            <td>{item.protein}</td>
            <td>{item.fat}</td>
            <td>{item.carbs}</td>
            <td>
              <button className="eat-btn">eat</button>
            </td>
          </tr>
        );
      })}
    </table>
  );
}
