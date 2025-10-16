import { createContext, useState, useMemo, useContext } from "react";

let ToastContext = createContext([]);

export const ToastProvider = ({ children }) => {

    const [toastDisplay, setToastDisplay] = useState("none");
    const [title, setTitle] = useState("");

    useMemo(() => {
        setTimeout(() => {
            if (toastDisplay === "block") {
                setToastDisplay("none");
            }
        }, 1500)
    }, [toastDisplay]);

    return (
        <ToastContext.Provider value={{ toastDisplay, setToastDisplay, title, setTitle }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext)
}