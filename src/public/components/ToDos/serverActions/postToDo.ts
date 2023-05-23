import { HEADERS } from './headers';

export default async function post_todo(toDoTitle: string, toDoDescription: string, toDoState:string) {

    const toDoPost = {
        title: toDoTitle,
        description: toDoDescription,
        state: toDoState
    };

    return await fetch('/api/custom_plugin/postToDo', {
        method: "POST",
        body: JSON.stringify(toDoPost),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};