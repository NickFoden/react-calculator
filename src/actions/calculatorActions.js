export const INPUT_VALUE = "INPUT_VALUE";
export const inputValue = inputValue => ({
  type: INPUT_VALUE,
  inputValue
});

export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const clearDisplay = () => ({
  type: CLEAR_DISPLAY
});

export const ADD = "ADD";
export const addAction = () => ({
  type: ADD
});
export const NEXT_VALUE = "NEXT_VALUE";
export const nextValue = inputValue => ({
  type: NEXT_VALUE,
  inputValue
});
export const PENDING = "PENDING";
export const pending = operator => ({
  type: PENDING,
  operator
});

export const SUBTRACT = "SUBTRACT";
export const subtractAction = () => ({
  type: SUBTRACT
});

export const MULTIPLY = "MULTIPLY";
export const multiplyAction = () => ({
  type: MULTIPLY
});

export const DIVISION = "DIVISION";
export const divisionAction = () => ({
  type: DIVISION
});

export const EQUALS = "EQUALS";
export const equalsAction = () => ({
  type: EQUALS
});

export const MEMORY_STORAGE = "MEMORY_STORAGE";
export const memoryStorageAction = () => ({
  type: MEMORY_STORAGE
});

export const MEMORY_RETRIEVAL = "MEMORY_RETRIEVAL";
export const memoryRetrievalAction = () => ({
  type: MEMORY_RETRIEVAL
});
