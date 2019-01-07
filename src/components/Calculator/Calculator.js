import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearDisplay,
  inputValue,
  memoryIndexUpdate,
  memoryRetrievalAction,
  memoryStorageAction,
  newOperator,
  nextValue,
  pending,
  updateNegative,
  updateTotalAction
} from "../../actions/calculatorActions";
import ReadOut from "./ReadOut";
import "./calculator.css";

class Calculator extends Component {
  addDecimal = (e, current) => {
    e.preventDefault();
    if (current.includes(".")) {
      return;
    } else {
      this.props.onInput(".");
    }
  };
  addToMemory = () => {
    let memoryLength = this.props.memory.length + 1;
    if (!this.props.memoryStatus) {
      this.props.memoryStore(memoryLength);
    }
  };
  addZero = (e, current) => {
    e.preventDefault();
    if (current.length === 1 && current.charAt(0) === "0") {
      return;
    } else {
      this.props.onInput("0");
    }
  };
  clickEqual = () => {
    this.newTotal();
    this.props.startPending("=");
  };
  changeNegative = e => {
    e.preventDefault();
    if (!this.props.currentDisplay.includes("-")) {
      let newDisplay = this.props.currentDisplay;
      if (this.props.currentDisplay.charAt(0) === "0") {
        newDisplay = this.props.currentDisplay.substring(1);
      }
      this.props.updateNegativeValue(`-${newDisplay}`);
    } else {
      let newDisplay = this.props.currentDisplay.replace("-", "");
      this.props.updateNegativeValue(newDisplay);
    }
  };
  clickOperator = (e, operator) => {
    e.preventDefault();
    if (this.props.pendingEval === true) {
      this.props.updateOperator(operator);
    } else if (this.props.pendingStatus === true) {
      this.props.updateOperator(operator);
    } else {
      this.props.startPending(operator);
      //   this.props.updateOperator(operator);
      this.newTotal();
    }
  };
  inputInteger = (e, num) => {
    e.preventDefault();
    if (this.props.pendingEval === true) {
      this.props.nextValue(num);
    } else {
      this.props.onInput(num);
    }
  };

  newTotal = () => {
    if (this.props.pending === "" || this.props.operator === "=") {
      return;
    }

    let newTotal = "";
    let pendingAmount = Number(this.props.pending);
    const newAmount = Number(this.props.currentDisplay);
    if (this.props.currentTotal) {
      pendingAmount = Number(this.props.currentTotal);
    }
    if (this.props.operator === "+") {
      newTotal = pendingAmount + newAmount;
    } else if (this.props.operator === "-") {
      newTotal = pendingAmount - newAmount;
    } else if (this.props.operator === "/") {
      newTotal = pendingAmount / newAmount;
    } else if (this.props.operator === "x") {
      newTotal = pendingAmount * newAmount;
    }
    this.props.updateTotal(newTotal.toString());
  };
  retrieveMemory = () => {
    const memoryLength = this.props.memory.length;
    let index = 0;
    if (this.props.currentMemory <= memoryLength) {
      index = this.props.currentMemory - 1;
      this.props.memoryRetrieve(this.props.memory[index]);
    } else if (this.props.currentMemory === 0) {
      index = memoryLength;
    }
    this.props.updateCurrentMemoryIndex(index);
  };

  render() {
    return (
      <div>
        Calculator
        <ReadOut currentDisplay={this.props.currentDisplay} />
        <div className="calc-container">
          <button onClick={e => this.props.onClear()}>clear</button>
          <button onClick={e => this.changeNegative(e)}> +/-</button>
          <button onClick={e => this.clickOperator(e, "/")}> /</button>
          <button onClick={e => this.clickOperator(e, "x")}> X</button>
          <button onClick={e => this.inputInteger(e, "7")}> 7</button>
          <button onClick={e => this.inputInteger(e, "8")}> 8</button>
          <button onClick={e => this.inputInteger(e, "9")}> 9</button>
          <button onClick={e => this.clickOperator(e, "-")}> -</button>
          <button onClick={e => this.inputInteger(e, "4")}> 4</button>
          <button onClick={e => this.inputInteger(e, "5")}> 5</button>
          <button onClick={e => this.inputInteger(e, "6")}> 6</button>
          <button onClick={e => this.clickOperator(e, "+")}> +</button>
          <button onClick={e => this.inputInteger(e, "1")}> 1</button>
          <button onClick={e => this.inputInteger(e, "2")}> 2</button>
          <button onClick={e => this.inputInteger(e, "3")}> 3</button>
          <button onClick={e => this.addToMemory()}> MS</button>
          <button onClick={e => this.addZero(e, this.props.currentDisplay)}>
            {" "}
            0
          </button>
          <button onClick={e => this.addDecimal(e, this.props.currentDisplay)}>
            {" "}
            .
          </button>
          <button onClick={e => this.clickEqual(e)}> =</button>
          <button onClick={e => this.retrieveMemory(e)}> MR</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentDisplay: state.calculator.currentDisplay,
  currentMemory: state.calculator.currentMemory,
  currentTotal: state.calculator.currentTotal,
  memory: state.calculator.memory,
  memoryStatus: state.calculator.memoryStatus,
  operator: state.calculator.operator,
  pending: state.calculator.pending,
  pendingEval: state.calculator.pendingEval,
  pendingStatus: state.calculator.pendingStatus
});

const mapDispatchToProps = dispatch => ({
  onClear() {
    dispatch(clearDisplay());
  },
  onInput(number) {
    dispatch(inputValue(number));
  },
  startPending(operator) {
    dispatch(pending(operator));
  },
  memoryRetrieve(numberString) {
    dispatch(memoryRetrievalAction(numberString));
  },
  memoryStore(memoryLength) {
    dispatch(memoryStorageAction(memoryLength));
  },
  nextValue(number) {
    dispatch(nextValue(number));
  },
  updateCurrentMemoryIndex(index) {
    dispatch(memoryIndexUpdate(index));
  },
  updateNegativeValue(number) {
    dispatch(updateNegative(number));
  },
  updateOperator(operator) {
    dispatch(newOperator(operator));
  },
  updateTotal(number) {
    dispatch(updateTotalAction(number));
  }
});
// const actionCreators = {
//   clearDisplay
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
