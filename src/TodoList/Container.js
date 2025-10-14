import "../Styles/container.css";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import NewList from "./NewList"

export default function Container() {

    return(
        <>
        <div className="container">
            <h2>Todo List</h2>
            <NavBar />
            <Outlet />
            <NewList />
        </div>
        </>
    )
}