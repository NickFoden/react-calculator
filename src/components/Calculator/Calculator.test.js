import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import rootReducer from "../../reducers/index";
import Calculator from "./Calculator";

function connectedRender(
  testComponent,
  { initialState, store = createStore(rootReducer, initialState) } = {
    operator: "",
    currentDisplay: "0",
    currentMemory: "",
    currentTotal: 0,
    memory: [],
    memoryStatus: false,
    pause: false,
    pending: "",
    pendingEval: false,
    pendingStatus: false,
    showingTotal: false
  }
) {
  return {
    ...render(<Provider store={store}>{testComponent}</Provider>),
    store
  };
}

it("renders without crashing", () => {
  connectedRender(<Calculator />);
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
  fireEvent.click(getByText("clear"));
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("3");
});

it("can subtract numbers", () => {
  const { getByTestId, getByText } = connectedRender(<Calculator />);
  fireEvent.click(getByText("clear"));
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("-"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));
  expect(getByTestId("readout-div")).toHaveTextContent("2");
});
