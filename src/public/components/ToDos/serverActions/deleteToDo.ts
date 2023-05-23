import { HEADERS } from './headers';
export default async function delete_todo(toDoDelete:{ _id: string; }) {
    return await fetch('/api/custom_plugin/deleteToDo', {
        method: "DELETE",
        body: JSON.stringify(toDoDelete),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};