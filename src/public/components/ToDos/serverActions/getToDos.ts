export default async function get_todos(http, toDoState: string, offSet: number, size: number = 5, sortOrder: "asc" | "desc") {
    const data = await http.get('/api/custom_plugin/getToDos', { query: { toDoState, offSet, size, sortOrder } })
    return data;
};