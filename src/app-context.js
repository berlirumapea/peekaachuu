import React from "react";

const Context = React.createContext();

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_POKEMON": {
      return { ...state, myPokes: [...state.myPokes, action.payload] };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {});
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useAppContext() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

export { AppContextProvider, useAppContext };
