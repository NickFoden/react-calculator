import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { Calculator } from "./Calculator";

const mockStore = configureMockStore();
const store = mockStore({});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<div />, div);
  ReactDOM.unmountComponentAtNode(div);
});
