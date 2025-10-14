import "../Styles/container.css";
import "../Styles/boxItems.css";
import BoxItems from "./BoxItems";
import { useNewList } from "../Contexts/NewListContext";

export default function Still() {
    const { lists } = useNewList();

    return (
        <div className="content">
            {lists.map((list) => {
                return !list.isCompleted ? (
                    <BoxItems key={list.id} list={list} />
                ) : null;
            })}
        </div>
    );
}
