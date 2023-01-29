import { useEffect } from "react";
import { createContext, useReducer, useState } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

// context provider to reach user states

export const ContextProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    console.log("Context");
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        notification,
        setNotification,
        conversations,
        setConversations,
      }}
    >
      {children}
    </Context.Provider>
  );
};
