import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let eatList = [];

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    id: "",
    isLogin: false,
    bodyMeasured: "",
    BMI: "",
    userInforList: {
      weight: "",
      height: "",
      age: "",
      gender: "",
      intensity: "",
    },
    nutritions: {
      calorie: "",
      protein: "",
      fat: "",
      carbs: "",
    },
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.status;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    bodyMeasured: (state, action) => {
      state.bodyMeasured = action.payload;
    },
    clearBodyData: (state) => {
      state.userInforList = undefined;
      state.nutritions = undefined;
    },
    userInforList: (state, action) => {
      console.log("action:", action);
      const weight = action.payload.weight;
      const height = action.payload.height;
      const age = action.payload.age;
      const gender = action.payload.gender;
      const intensity = action.payload.intensity;
      state.userInforList = {
        weight,
        height,
        age,
        gender,
        intensity,
      };
      const BMI = +weight / Math.pow(+height / 100, 2);
      state.BMI = BMI.toFixed(2);
    },
    calNutrition: (state, action) => {
      console.log("123321");
      const weight = action.payload.weight;
      const height = action.payload.height;
      const age = action.payload.age;
      const gender = action.payload.gender;
      const intensity = action.payload.intensity;
      const calorie =
        gender === "male"
          ? (
              13.397 * +weight +
              4.799 * +height -
              5.677 * +age +
              88.362
            ).toFixed(0)
          : (9.247 * +weight + 3.098 * +height - 4.33 * +age + 447.593).toFixed(
              0
            );
      const fat = ((+calorie * 0.2) / 9).toFixed(0);
      const protein = ((+calorie * 0.35) / 4).toFixed(0);
      const carbs = ((+calorie * 0.45) / 4).toFixed(0);
      state.nutritions = {
        calorie,
        protein,
        fat,
        carbs,
      };
    },
    addEatList: (state, action) => {
      const name = action.payload.name;
      const kcal = action.payload.kcal;
      const protein = action.payload.protein;
      const fat = action.payload.fat;
      const carbs = action.payload.carbs;
      eatList.push({
        name,
        kcal,
        protein,
        fat,
        carbs,
      });
      localStorage.setItem("eatList", JSON.stringify(eatList));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  userInforList,
  clearBodyData,
  bodyMeasured,
  calNutrition,
  addEatList,
} = mainSlice.actions;

export const addEatListAsync = (action) => (dispatch) => {
  dispatch(addEatList(action));
};

export default mainSlice.reducer;
