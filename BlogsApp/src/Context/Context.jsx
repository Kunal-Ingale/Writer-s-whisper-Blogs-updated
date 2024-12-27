import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./reducer";

// Initial state structure
const INITIAL_STATE = {

  user: localStorage.getItem("user"),
  isFetching: false,
  error: false,
};

// Create context
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  // Initialize useReducer with the state and dispatch function
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // Synchronize user data with localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]); // Only sync when user changes

  // Return the context provider with values and the dispatch function
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch, // Pass dispatch so it can be used in components
      }}
    >
      {children} {/* Children components can access context values */}
    </Context.Provider>
  );
};





// <App /> will be passed to the ContextProvider component as the children prop.
    //any components or JSX passed as children will have access to the context values provided by Context.Provider. It's a way of sharing state or functionality across a tree of components.
// dispatch is a function that comes from the useReducer hook. It's used to send actions to the reducer function, which in turn updates the state of your application