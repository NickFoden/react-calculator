import React from "react";
import ReactDOM from "react-dom";
import ReadOut from "./ReadOut";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReadOut currentDisplay={"50"} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
