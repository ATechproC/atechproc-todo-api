export default function listReducer(currentList, action) {
    switch (action.type) {
        case "deleted": {
            const newList = [...currentList];
            let newArr = [];

            for (let i = 0; i < newList.length; i++) {
                if (newList[i].id === action.payLoad.moodId) {
                    newList[i].title = "";
                    break;
                }
            }

            for (let i = 0; i < newList.length; i++) {
                if (newList[i].title !== "") {
                    newArr[newArr.length] = newList[i];
                }
            }

            localStorage.setItem("lists", JSON.stringify(newArr))

            return newArr;
        }

        case "replace": {
            let newList = [...currentList];
            const index = action.payLoad.moodId - 1;
            newList[index].title = action.payLoad.inputTitle;
            newList[index].description = action.payLoad.inputDesc;

            localStorage.setItem("lists", JSON.stringify(newList))

            return newList;
        }

        case "completed": {

            const newList = [...currentList];

            for (let i = 0; i < newList.length; i++) {
                if (newList[i].id === action.id) {
                    newList[i] = {
                        ...newList[i],
                        isCompleted : !newList[i].isCompleted,
                    }
                    break;
                }
            }

            return newList;

        }

        case "added": {
            const newList = [...currentList];
            const value = {
                id: currentList.length + 1,
                title: action.payLoad.title,
                description: action.payLoad.description,
                isCompleted: false,
            }
            return [...newList, value];
        }

        case "set-todos" : return action.payload.todos;

        default: {
            throw Error("Unknown Action " + action.type);
        }
    }
}
