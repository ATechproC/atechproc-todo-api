import "../Styles/container.css";
import { useNewList } from "../Contexts/NewListContext";

import "../Styles/boxItems.css";

import BoxItems from "./BoxItems";

export default function All() {
    
    const { lists } = useNewList();

    return (
        <div
            className="content"
        >
            {lists.map((list, index) => {
                return <BoxItems list={list} key={index} />;
            })}
        </div>
    );
}
