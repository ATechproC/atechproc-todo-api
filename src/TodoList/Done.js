import BoxItems from "./BoxItems";
import { useNewList } from "../Contexts/NewListContext";

export default function Done() {
    const { lists } = useNewList();

    if (lists) {
        return (
            <div className="content">
                {lists.map((list) => {
                    return list.isCompleted ? (
                        <BoxItems key={list.id} list={list} />
                    ) : null;
                })}
            </div>
        );
    }
}
