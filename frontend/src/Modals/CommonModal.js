import "../Styles/deleteModal.css";
import { useState } from "react";

import { useToast } from "../Contexts/toastContext";

import { useModal } from "../Contexts/CommonModalContext";

import { useNewList } from "../Contexts/NewListContext";

export default function CommonModal() {

    const { dispatch } = useNewList();

    const {
        idMoodObj: { moodId },
        moodObj: { mood },
        displayMoodObj: { displayMood, setDisplayMood },
    } = useModal();

    function handleClickDeleteList() {
        setDisplayMood("none");
    }

    // == handle delete part == //

    function handleDelete() {
        dispatch({
            type: "deleted",
            payLoad: {
                moodId,
            },
        });
        setDisplayMood("none");
    }

    // handle edit part :

    function replaceList() {
        if (inputValues.title !== "" && inputValues.description !== "") {
            dispatch({
                type: "replace",
                payLoad: {
                    moodId,
                    inputTitle: inputValues.title,
                    inputDesc: inputValues.description,
                },
            });
            setDisplayMood("none");
            setInputValues({
                title: "",
                description: "",
            })
        }
    }

    // start of inputs value //

    const [inputValues, setInputValues] = useState({
        title: "",
        description: "",
    });

    // end of inputs value //

    // alert toast :

    const { setToastDisplay, setTitle } = useToast();

    if (mood === "delete") {
        return (
            <>
                <div
                    className="overlay"
                    style={{ display: displayMood }}
                    onClick={handleClickDeleteList}
                ></div>
                <div className="modal-container" style={{ display: displayMood }}>
                    <h3>Confirm Deleting</h3>
                    <h4>Are you sure deleting this todo ?</h4>
                    <div className="btns-container">
                        <button
                            className="delete"
                            onClick={() => {
                                handleDelete();
                                setToastDisplay("block");
                                setTitle("removed");
                            }}
                        >
                            delete
                        </button>
                        <button className="cancel" onClick={handleClickDeleteList}>
                            cancel
                        </button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div
                    className="overlay"
                    style={{ display: displayMood }}
                    onClick={handleClickDeleteList}
                ></div>
                <div className="modal-container" style={{ display: displayMood }}>
                    <div className="modal">
                        <h3 className="title">Todo List</h3>
                        <div>
                            <label htmlFor="title">title :</label>
                            <input
                                id="title"
                                type="text"
                                value={inputValues.title}
                                onChange={(e) =>
                                    setInputValues({ ...inputValues, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="desc">description :</label>
                            <input
                                id="desc"
                                type="text"
                                value={inputValues.description}
                                onChange={(e) =>
                                    setInputValues({
                                        ...inputValues,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="btns-container">
                        <button
                            className="delete"
                            onClick={() => {
                                replaceList();
                                if (
                                    inputValues.title !== "" &&
                                    inputValues.description !== ""
                                ) {
                                    setToastDisplay("block");
                                    setTitle("edit");
                                }
                            }}
                        >
                            edit
                        </button>
                        <button className="cancel" onClick={handleClickDeleteList}>
                            cancel
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
