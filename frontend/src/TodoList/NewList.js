import "../Styles/newList.css";
import { useState, useEffect } from "react";

import { useNewList } from "../Contexts/NewListContext";
import { useToast } from "../Contexts/toastContext";

export default function NewList() {
    const { lists, dispatch } = useNewList();

    function handleNewListItem() {
        dispatch({ type: "added", payLoad: inputValues })
    }

    // useEffect(() => {

    //     const url = "http://localhost:8080/add";

    //     const addNewTodo = async (url) => {
    //         await fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 title: "first test",
    //                 description: "first description",
    //                 isCompleted: false
    //             })
    //         });
    //     }

    //     addNewTodo(url);

    // }, [title, description]);

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    const [inputValues, setInputValues] = useState({
        title: "",
        description: "",
    });

    const { setToastDisplay, setTitle } = useToast();

    return (
        <div className="inputs-container">
            <button
                onClick={() => {
                    if (inputValues.title !== "" &&
                        inputValues.description) {
                        handleNewListItem();
                        setInputValues({
                            title: "",
                            description: "",
                        });
                        setToastDisplay("block");
                        setTitle("new todo added");
                    }
                }}
            >
                Add
            </button>
            <input
                style={{ marginLeft: "10px" }}
                placeholder="Add the title"
                value={inputValues.title}
                onChange={(e) => setInputValues({
                    ...inputValues,
                    title: e.target.value,
                })}
                type="text"
            />
            <input
                style={{ marginLeft: "10px" }}
                placeholder="Add the description"
                value={inputValues.description}
                onChange={(e) => setInputValues({
                    ...inputValues,
                    description: e.target.value,
                })}
                type="text"
            />
        </div>
    );
}
