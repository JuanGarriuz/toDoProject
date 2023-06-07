export default async function getAllToDos(http) {
    const data = await http.get('/api/custom_plugin/getAllToDos');
    return data;
};