import { createContext, useContext, useEffect, useReducer, useState } from "react";

import listReducer from "../reducers/listReducer";

let NewListContext = createContext([]);

export const NewListProvider = ({ children }) => {

    
    const [lists, dispatch] = useReducer(listReducer, []);

    useEffect(() => {
        

        const url = "http://localhost:8080/todos";

        const getTodos = async (url) => {
            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const { todos } = await response.json();
                
                dispatch({type : "set-todos", action : {
                    payload : { todos }
                }})

                console.log(todos);
                return todos;

            } catch (error) {
                console.error('Failed to fetch todos:', error);
                // Handle error state in your component
            }
        }

        getTodos(url);
        
    }, []);



    return (
        <NewListContext.Provider value={{ dispatch, lists }}>
            {children}
        </NewListContext.Provider>
    )
}

export const useNewList = () => {
    return useContext(NewListContext);
}
