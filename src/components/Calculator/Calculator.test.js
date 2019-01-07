import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "react-testing-library";
import { axe, toHaveNoViolations } from "jest-axe";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import rootReducer from "../../reducers/index";
import Calculator from "./Calculator";

function connectedRender(
  testComponent,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{testComponent}</Provider>),
    store
  };
}

it("Calculator renders without crashing", () => {
  const store = createStore(rootReducer);
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Calculator />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("can input numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const testNumber =
    numberArray[Math.floor(Math.random() * numberArray.length)];
  //Randomly push a number and see if it displays
  // console.log("Test Number " + testNumber);
  fireEvent.click(getByText(`${testNumber}`));
  expect(getByTestId("readout-div")).toHaveTextContent(`${testNumber}`);
});

it("can add numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("3");
});

it("can add negative numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("6"));
  fireEvent.click(getByText("+/-"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("3");
});

it("can subtract numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("-"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("2");
});

it("can multiply numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("X"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("8");
});

it("can multiply larger numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("0"));
  fireEvent.click(getByText("0"));
  fireEvent.click(getByText("X"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText("="));
  //400 x 3 = 1200
  expect(getByTestId("readout-div")).toHaveTextContent("1200");
});

it("can divide numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("/"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("3");
});

it("can divide double digit inputed numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("/"));
  fireEvent.click(getByText("7"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("3");
});

it("can retrieve Stored Memory Value", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText("="));
  //value should be 5 and now save to memory
  fireEvent.click(getByText("MS"));
  //Keep Adding
  fireEvent.click(getByText("+"));
  //Add 3
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText("="));
  //value should be 8 and now save to memory
  fireEvent.click(getByText("MS"));
  //clear the calculator
  fireEvent.click(getByText("clear"));
  //retrieve the 2nd stored value of 5
  fireEvent.click(getByText("MR"));
  fireEvent.click(getByText("MR"));
  //take the 2nd value of 5 and add
  fireEvent.click(getByText("+"));
  //Add 2
  fireEvent.click(getByText("2"));
  // hit equal and should be 7
  fireEvent.click(getByText("="));

  expect(getByTestId("readout-div")).toHaveTextContent("7");
});

expect.extend(toHaveNoViolations);
//Check if component is accesible with Axe
it("Calculator is accesible check with axe", async () => {
  const store = createStore(rootReducer);
  const container = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
