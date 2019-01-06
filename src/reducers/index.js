import { combineReducers } from "redux";
import calculatorReducer from "./calculatorReducer";

//Import reducers here and then use combine reducer to export them

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

export default rootReducer;
