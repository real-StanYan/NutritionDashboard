import { createSlice, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main";

const initialMovementsState = {
  movements: [],
};

const movementsSlice = createSlice({
  name: "movements",
  initialState: initialMovementsState,
  reducers: {
    add(state) {
      //nothing yet
    },
    decrement(state) {
      //nothing yet
    },
  },
});

//LOGGING IN/OUT
const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export default configureStore({
  reducer: {
    main: mainReducer,
    movements: movementsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const movementsActions = movementsSlice.actions;
export const authActions = authSlice.actions;
