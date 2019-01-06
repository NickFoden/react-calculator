import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";

const store = createStore(
  rootReducer,
  compose(
    // applyMiddleware(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

window.store = store;

export default store;
