import { HEADERS } from './headers';

export default async function update_todo(toDoId: string, toDoTitle: string, toDoDescription: string, toDoState:string) {

    const updatePost = {
        _id: toDoId,
        title: toDoTitle,
        description: toDoDescription,
        state: toDoState
    };
    return await fetch('/api/custom_plugin/updateToDo', {
        method: "PUT",
        body: JSON.stringify(updatePost),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};