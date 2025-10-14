import { createContext, useContext, useState } from "react";
let CommonModalContext = createContext([]);

export const ModalProvider = ({ children }) => {
    

    const [mood, setMood] = useState("");

    const [displayMood, setDisplayMood] = useState("none");

    const [moodId, setMoodId] = useState(0);

    let displayMoodObj = {
        displayMood,
        setDisplayMood,
    };

    let idMoodObj = {
        moodId,
        setMoodId,
    };

    let moodObj = {
        mood,
        setMood,
    }

    return (
        <CommonModalContext.Provider value={{ displayMoodObj, idMoodObj, moodObj }} >
            {children}
        </CommonModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(CommonModalContext);
}
