import { useEffect, useState, useRef } from 'react';
import { todo_interface } from "../interfaces/todo_interface";
import getTodos from '../serverActions/getToDosByState';
import { CoreStart } from 'opensearch-dashboards/public';
/*
A custom hook to manage a todos list based on their state   

Props:
    HTTP service: responsible for communication with the server.
    State: Indicates the state that the todo in the list will have.
*/

interface useToDosProps {
    http: CoreStart['http'],
    state: "toStart" | "inProgress" | "completed",
}

export const useToDos = ({ http, state }: useToDosProps) => {

    //Manage list of todos.
    const [listToDos, setListTodos] = useState<todo_interface[]>([]);
    //Handles from which point the todos are requested from the database.
    const [offSet, setOffSet] = useState(0);
    //Listens to the web to determine when the list needs to be updated.
    const [listener, setListener] = useState<number>(new Date().getTime());
    //Indicates the order in which data is requested from the server.
    const [sortToDosBy, setSortToDosBy] = useState<"asc" | "desc">("asc");
    //Manages the panel where the todos will be displayed.  
    const panelElement = useRef<HTMLInputElement>(null);
    const [listAllToDos, setListAllToDos] = useState<todo_interface[]>([]);
    

    /*
    Every time the listener is triggered, it will reload the list of todos being displayed.
    The getTodos function does not request more todos; it simply requests the number of todos that are already being displayed.
    */
    useEffect(() => {
        (async () => {
            const queryToDos = await getTodos(http, state, 0, offSet, sortToDosBy);
            setListTodos(queryToDos.toDos);
            setOffSet(queryToDos.totalHits);
            const query = await getTodos(http, state, 0, offSet, sortToDosBy);
            setListAllToDos(query.toDos);
            console.log(listAllToDos);
        })();
    }, [listener]);

    /*
    The handleScroll function is responsible for requesting more data from the server when the scroll bar reaches near the bottom.
    */
    const handleScroll = async () => {
        if (panelElement?.current) {
            const { scrollTop, scrollHeight, clientHeight } = panelElement.current;
            const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

            if (scrolledToBottom) {
                const queryToDos = await getTodos(http, state, offSet, undefined, sortToDosBy);
                setListTodos(listToDos.concat(queryToDos.toDos));
                setOffSet(offSet + queryToDos.totalHits);
            }
        }
    };

    return [
        panelElement,
        listToDos,
        handleScroll,
        setListener,
        sortToDosBy,
        setSortToDosBy,
        listAllToDos
    ];

};
