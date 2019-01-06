const initialState = {
  operator: "",
  currentDisplay: "50",
  currentTotal: 0,
  memory: {},
  pending: "",
  pendingStatus: false
};

export default function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case "INPUT_VALUE": {
      return {
        ...state,
        currentDisplay: state.currentDisplay + action.inputValue
      };
    }
    case "NEXT_VALUE": {
      return {
        ...state,
        currentDisplay: action.inputValue
      };
    }
    case "CLEAR_DISPLAY": {
      return {
        ...state,
        currentDisplay: "0",
        operator: "",
        pending: ""
      };
    }
    case "PENDING": {
      return {
        ...state,
        operator: action.operator,
        pending: state.currentDisplay,
        pendingStatus: true
      };
    }
    case "ADD": {
      return Object.assign({}, state);
    }
    case "SUBTRACT": {
      return Object.assign({}, state);
    }
    case "MULTIPLY": {
      return Object.assign({}, state);
    }
    case "DIVISION": {
      return Object.assign({}, state);
    }
    case "EQUALS": {
      return Object.assign({}, state);
    }
    case "MEMORY_STORAGE": {
      return Object.assign({}, state);
    }
    case "MEMORY_RETRIEVAL": {
      return Object.assign({}, state);
    }
    default:
      return state;
  }
}
