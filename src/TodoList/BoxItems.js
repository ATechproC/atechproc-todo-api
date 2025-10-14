import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "../Styles/boxItems.css";
import { useState, useMemo } from "react";

import { useNewList } from "../Contexts/NewListContext";
import { useToast } from "../Contexts/toastContext";

import { useModal } from "../Contexts/CommonModalContext";


export default function BoxItems({ list }) {

    const {
        displayMoodObj: { setDisplayMood },
        idMoodObj: { setMoodId },
        moodObj: { setMood }
    } = useModal();

    const style = {
        backgroundColor: "#fff",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        fontSize: "10px",
        padding: "4px",
        border: ".1em solid",
        cursor: "pointer",
    };

    const [doneIconStyle, setDoneIconStyle] = useState({
        ...style,
        color: "blue",
    });

    const { dispatch } = useNewList();


    function handleClickFunction(id) {
        dispatch({ type: "completed", id })
    }

    useMemo(() => {
        setDoneIconStyle({
            ...doneIconStyle,
            color: list.isCompleted === true ? "#fff" : "blue",
            backgroundColor: list.isCompleted === true ? "blue" : "#fff",
        });
    }, [list.isCompleted]);

    // start toast :

    const { setToastDisplay, setTitle } = useToast();

    useMemo(() => {
        setToastDisplay(list.isCompleted ? "block" : "none");
        
    }, [list.isCompleted])

    return (
        <>
            <div className="box-items items">
                <div className="activity">
                    <h3>{list.title}</h3>
                    <p>{list.description}</p>
                </div>
                <div className="box-icons">
                    <DeleteOutlinedIcon
                        style={{ ...style, color: "red" }}
                        onClick={() => {
                            setMoodId(list.id);
                            setDisplayMood("block");
                            setMood("delete");
                        }}
                    />
                    <EditOutlinedIcon
                        style={{ ...style, color: "green" }}
                        onClick={() => {
                            setMoodId(list.id);
                            setMood("edit");
                            setDisplayMood("block");
                        }}
                    />
                    <DoneOutlinedIcon
                        style={doneIconStyle}
                        onClick={() => {
                            handleClickFunction(list.id);
                            setTitle(`${list.title} added`);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
