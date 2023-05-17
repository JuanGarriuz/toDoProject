import { HEADERS } from './headers';
export default async function update_todo(toDoId: string, toDoTitle: string, toDoDescription: string, toDoState:string) {

    const updatePost = {
        _id: toDoId,
        title: toDoTitle,
        description: toDoDescription,
        state: toDoState
    };
    console.log(toDoId);
    // Use the core http service to make a response to the server API.
    /*        await http.post('/api/custom_plugin/postToDo', {
                body: JSON.stringify(toDoPost1),
            });
        */
    return await fetch('/api/custom_plugin/updateToDo', {
        method: "PUT",
        body: JSON.stringify(updatePost),
        headers: HEADERS,
    })
        .then(response => response.json())
        .then(json => console.log(json));
};