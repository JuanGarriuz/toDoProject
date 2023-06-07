import { HEADERS } from './headers';
/*
    The deleteTodo function requests an ID that is passed to the server to delete the todo with that ID.
*/
export default async function deleteTodo(toDoDelete: { _id: string; }) {
    return await fetch('/api/custom_plugin/deleteToDo', {
        method: "DELETE",
        body: JSON.stringify(toDoDelete),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};
