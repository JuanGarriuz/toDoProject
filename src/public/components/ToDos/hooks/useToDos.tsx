import { useEffect, useState, useRef } from 'react';
import { todo_interface } from "../interfaces/todo_interface";
import get_todos from '../serverActions/getToDos';
import { CoreStart } from 'opensearch-dashboards/public';

interface useToDosProps {
    http: CoreStart['http'],
    state: "toStart" | "inProgress" | "completed",
}

export const useToDos = ({ http, state }: useToDosProps) => {

    const [listToDos, setListTodos] = useState<todo_interface[]>([]);
    const [offSet, setOffSet] = useState(0);
    const [listener, setListener] = useState<number>(new Date().getTime());
    const [sortToDosBy, setSortToDosBy] = useState<"asc" | "desc">("asc");
    const panelElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
          const queryToDos = await get_todos(http, state, 0, offSet, sortToDosBy);
          setListTodos(queryToDos.toDos);
          setOffSet(queryToDos.totalHits);
        })();
      }, [listener]);

    const handleScroll = async () => {
        if (panelElement?.current) {
            const { scrollTop, scrollHeight, clientHeight } = panelElement.current;
            const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

            if (scrolledToBottom) {
                const queryToDos = await get_todos(http, state, offSet, undefined, sortToDosBy);
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
    ];

};
