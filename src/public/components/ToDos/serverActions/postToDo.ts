import { HEADERS } from './headers';
export default async function post_todo(toDoTitle: string, toDoDescription: string, toDoState:string) {

    const toDoPost = {
        title: toDoTitle,
        description: toDoDescription,
        state: toDoState
    };

    // Use the core http service to make a response to the server API.
    /*        await http.post('/api/custom_plugin/postToDo', {
                body: JSON.stringify(toDoPost1),
            });
        */
    return await fetch('/api/custom_plugin/postToDo', {
        method: "POST",
        body: JSON.stringify(toDoPost),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};