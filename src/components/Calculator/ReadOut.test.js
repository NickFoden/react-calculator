import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import "jest-dom/extend-expect";
import ReadOut from "./ReadOut";
import { render } from "react-testing-library";
import { axe, toHaveNoViolations } from "jest-axe";
import "react-testing-library/cleanup-after-each";

it("ReadOut renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReadOut />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("ReadOut renders the correct props string", () => {
  const { getByTestId } = render(<ReadOut currentDisplay={"222"} />);
  expect(getByTestId("readout-div")).toHaveTextContent("222");
});
it("ReadOut should show display string  minus leading zero", () => {
  const { getByTestId } = render(<ReadOut currentDisplay={"055"} />);
  expect(getByTestId("readout-div")).toHaveTextContent("55");
});
it("ReadOut should show - at start of string", () => {
  const { getByTestId } = render(<ReadOut currentDisplay={"-55"} />);
  expect(getByTestId("readout-div")).toHaveTextContent("-55");
});

expect.extend(toHaveNoViolations);
//Check if component is accesible with Axe
it("Display is accesible check with axe", async () => {
  const container = ReactDOMServer.renderToString(
    <ReadOut currentDisplay={"222"} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
