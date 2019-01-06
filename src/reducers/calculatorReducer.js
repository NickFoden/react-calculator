const initialState = {
  currentDisplay: "",
  memory: {}
};

export default function calculatorReducer(state = initialState, action) {
  switch (action.type) {
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
