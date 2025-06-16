import { createContext, useReducer } from 'react';

export const DreamsContext = createContext();

export const dreamsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DREAMS_ENTRY':
      return { dreams: action.payload };
    case 'CREATE_DREAMS_ENTRY':
      return { dreams: [action.payload, ...state.dreams] };
    case 'UPDATE_DREAMS_ENTRY':
      return {
        dreams: state.dreams.map((dream) =>
          dream._id === action.payload._id ? action.payload : dream
        ),
      };
    case 'DELETE_DREAMS_ENTRY':
      return {
        dreams: state.dreams.filter(
          (dream) => dream._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const DreamsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dreamsReducer, { dreams: [] });

  return (
    <DreamsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DreamsContext.Provider>
  );
};
