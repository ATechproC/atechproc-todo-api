import { createContext, useContext, useReducer } from "react";

import listReducer from "../reducers/listReducer";

let NewListContext = createContext([]);

export const NewListProvider = ({ children }) => {

    const [lists, dispatch] = useReducer(listReducer, []);
    
    return (
        <NewListContext.Provider value={{ dispatch, lists }}>
            {children}
        </NewListContext.Provider>
    )
}

export const useNewList = () => {
    return useContext(NewListContext);
}
