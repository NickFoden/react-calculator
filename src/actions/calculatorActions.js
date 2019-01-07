export const INPUT_VALUE = "INPUT_VALUE";
export const inputValue = inputValue => ({
  type: INPUT_VALUE,
  inputValue
});

export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const clearDisplay = () => ({
  type: CLEAR_DISPLAY
});

export const NEXT_VALUE = "NEXT_VALUE";
export const nextValue = inputValue => ({
  type: NEXT_VALUE,
  inputValue
});
export const NEW_OPERATOR = "NEW_OPERATOR";
export const newOperator = operator => ({
  type: NEW_OPERATOR,
  operator
});
export const PENDING = "PENDING";
export const pending = operator => ({
  type: PENDING,
  operator
});
export const MEMORY_INDEX_UPDATE = "MEMORY_INDEX_UPDATE";
export const memoryIndexUpdate = memoryIndex => ({
  type: MEMORY_INDEX_UPDATE,
  memoryIndex
});

export const MEMORY_STORAGE = "MEMORY_STORAGE";
export const memoryStorageAction = memoryLength => ({
  type: MEMORY_STORAGE,
  memoryLength
});

export const MEMORY_RETRIEVAL = "MEMORY_RETRIEVAL";
export const memoryRetrievalAction = memoryValue => ({
  type: MEMORY_RETRIEVAL,
  memoryValue
});
export const UPDATE_NEGATIVE = "UPDATE_NEGATIVE";
export const updateNegative = newNegative => ({
  type: UPDATE_NEGATIVE,
  newNegative
});
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const updateTotalAction = newTotal => ({
  type: UPDATE_TOTAL,
  newTotal
});
