export default async function getDateAndStateToDos(http) {
    const data = await http.get('/api/custom_plugin/getDateAndStateToDos');
    return data;
};