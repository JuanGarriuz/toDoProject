export default async function get_todos(http, toDoState: string, offSet:number, size:number = 5){
    // Use the core http service to make a response to the server API.
    const response = await http.get('/api/custom_plugin/getToDos', { query: { toDoState, offSet, size } });
    console.log(response);
    const data = {
        toDos: response.items,
        totalHits: response.totalHits
    }
    return data;
};
