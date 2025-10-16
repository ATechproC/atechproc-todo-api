import "../Styles/navBar.css";
import { NavLink } from "react-router";

export default function NavBar() {
    return(
        <div className="header-btns">
            <NavLink to="/all">
                <button>All</button>
            </NavLink>
            <NavLink to="/done">
                <button>Done</button>
            </NavLink>
            <NavLink to="/still">
                <button>Still</button>
            </NavLink>
        </div>
    )
}