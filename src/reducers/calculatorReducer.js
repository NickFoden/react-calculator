const initialState = {
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
};

export default function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case "CLEAR_DISPLAY": {
      return {
        ...state,
        operator: "",
        currentDisplay: "0",
        currentTotal: 0,
        pending: "",
        pendingEval: false,
        pendingStatus: false,
        showingTotal: false
      };
    }
    case "INPUT_VALUE": {
      return {
        ...state,
        currentDisplay: state.currentDisplay + action.inputValue,
        memoryStatus: false
      };
    }
    case "MEMORY_STORAGE": {
      return {
        ...state,
        currentMemory: action.memoryLength,
        memory: [...state.memory, state.currentDisplay],
        memoryStatus: true
      };
    }
    case "MEMORY_RETRIEVAL": {
      return {
        ...state,
        currentDisplay: action.memoryValue
      };
    }
    case "NEW_OPERATOR": {
      return {
        ...state,
        operator: action.operator
      };
    }
    case "NEXT_VALUE": {
      return {
        ...state,
        currentDisplay: action.inputValue,
        memoryStatus: false,
        pendingEval: false
      };
    }
    case "PENDING": {
      return {
        ...state,
        operator: action.operator,
        pending: state.currentDisplay,
        pendingEval: true
      };
    }
    case "MEMORY_INDEX_UPDATE": {
      return {
        ...state,
        currentMemory: action.memoryIndex
      };
    }
    case "UPDATE_NEGATIVE": {
      return {
        ...state,
        currentDisplay: action.newNegative
      };
    }
    case "UPDATE_TOTAL": {
      return {
        ...state,
        currentDisplay: action.newTotal,
        currentTotal: action.newTotal,
        pending: "0",
        pendingEval: true,
        pendingStatus: false
      };
    }
    default:
      return state;
  }
}
