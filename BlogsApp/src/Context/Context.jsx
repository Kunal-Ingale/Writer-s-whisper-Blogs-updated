import { createContext,useReducer } from "react";
import Reducer from "./reducer";
import { useEffect } from "react";

const INTIAL_STATE ={
  user:JSON.parse(localStorage.getItem("user") )|| null,
  isFetching:false,
  error:false
}

export const Context = createContext(INTIAL_STATE)

export const ContextProvider = ({children})=>{
    const [state , dispatch] = useReducer(Reducer,INTIAL_STATE)

     useEffect (()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
     },[state.user])

     

    return(
    <Context.Provider value={
        {user:state.user,
         isFetching:state.isFetching,
         error:state.error,
         dispatch
        }
    }>
        {children} 
        </Context.Provider>
)
}