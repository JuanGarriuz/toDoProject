import { todo_interface } from "../interfaces/todo_interface";

export default function sortToDos(queryToDos: todo_interface[], sortToDosBy: string): todo_interface[] {
    let sortedToDos: todo_interface[] = [];

    switch (sortToDosBy) {
        case "dateAsc":
            sortedToDos = queryToDos.slice().sort((a: todo_interface, b: todo_interface) => a._source.date - b._source.date);
            break;
        case "dateDesc":
            sortedToDos = queryToDos.slice().sort((a: todo_interface, b: todo_interface) => b._source.date - a._source.date);
            break;
        case "titleAsc":
            sortedToDos = queryToDos.slice().sort((a: todo_interface, b: todo_interface) => a._source.title.localeCompare(b._source.title));
            break;
        case "titleDesc":
            sortedToDos = queryToDos.slice().sort((a: todo_interface, b: todo_interface) => b._source.title.localeCompare(a._source.title));
            break;
    }

    return sortedToDos;
}