import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearDisplay,
  inputValue,
  nextValue,
  pending
} from "../../actions/calculatorActions";
import ReadOut from "./ReadOut";
import "./calculator.css";

class Calculator extends Component {
  addDecimal = (e, current) => {
    if (current.includes(".")) {
      return;
    } else {
      this.props.onInput(".");
    }
  };
  addZero = (e, current) => {
    if (current.length === 1 && current.charAt(0) === "0") {
      return;
    } else {
      this.props.onInput("0");
    }
  };
  clickOperator = (e, operator) => {
    e.preventDefault();
    this.props.startPending(operator);
  };
  inputInteger = (e, num) => {
    e.preventDefault();
    if (this.props.pendingStatus === false) {
      this.props.onInput(num);
    } else this.props.nextValue(num);
  };
  render() {
    console.log(this.props);

    return (
      <div>
        Calculator
        <ReadOut currentDisplay={this.props.currentDisplay} />
        <div className="calc-container">
          <button onClick={e => this.props.onClear()}>clear</button>
          <button> +/-</button>
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
          <button onClick={e => this.this.inputInteger(e, "3")}> 3</button>
          <button> MS</button>
          <button onClick={e => this.addZero("0", this.props.currentDisplay)}>
            {" "}
            0
          </button>
          <button
            onClick={e => this.addDecimal(".", this.props.currentDisplay)}
          >
            {" "}
            .
          </button>
          <button> =</button>
          <button> MR</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentDisplay: state.calculator.currentDisplay,
  currentTotal: state.calculator.currentTotal,
  operator: state.calculator.operator,
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
  nextValue(number) {
    dispatch(nextValue(number));
  }
});
// const actionCreators = {
//   clearDisplay
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
