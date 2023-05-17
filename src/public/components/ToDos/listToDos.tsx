import React, { useEffect, useRef, useState } from "react"
import { todo_interface } from "./interfaces/todo_interface"
import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer, EuiText } from "@elastic/eui";
import get_todos from './serverActions/getToDos'
import { ToDoDeleteButton } from "./toDoDeleteButton";
import { ToDoUpdateForm } from "./toDoUpdateForm";
import './styles.scss';
import { FormToDo } from "./addToDo";

export function ToDoList({ http }) {

  const [toStartListener, setToStartListener] = useState<number>(new Date().getTime());
  const [inProgressListener, setInProgressListener] = useState<number>(new Date().getTime());
  const [completedListener, setCompletedListener] = useState<number>(new Date().getTime());
  const [listToDosToStart, setListTodosToStart] = useState<todo_interface[]>([]);
  const [listToDosInProgress, setListTodosInProgress] = useState<todo_interface[]>([]);
  const [listToDosCompleted, setListTodosCompleted] = useState<todo_interface[]>([]);
  const [offSetToStart, setOffSetToStart] = useState(0);
  const [offSetInProgress, setOffSetInProgress] = useState(0);
  const [offSetCompleted, setOffSetCompleted] = useState(0);
  const panelElementToStart = useRef<HTMLInputElement>(null);
  const panelElementInProgress = useRef<HTMLInputElement>(null);
  const panelElementCompleted = useRef<HTMLInputElement>(null);


  //Migrar custom hooks***

  useEffect(() => {
    (async () => {
      const queryToDosToStart = await get_todos(http, "toStart", 0, offSetToStart);
      setListTodosToStart(queryToDosToStart.toDos);
      setOffSetToStart(queryToDosToStart.totalHits);
    })();
  }, [toStartListener]);

  useEffect(() => {
    (async () => {
      const queryToDosCompleted = await get_todos(http, "completed", 0, offSetCompleted);
      setListTodosCompleted(queryToDosCompleted.toDos);
      setOffSetCompleted(queryToDosCompleted.totalHits);
    })();
  }, [completedListener]);

  useEffect(() => {
    (async () => {
      const queryToDosInProgress = await get_todos(http, "inProgress", 0, offSetInProgress);
      setListTodosInProgress(queryToDosInProgress.toDos);
      setOffSetInProgress(queryToDosInProgress.totalHits);
    })();
  }, [inProgressListener]);

  const handleScrollToStart = async () => {
    if (panelElementToStart?.current) {
      const { scrollTop, scrollHeight, clientHeight } = panelElementToStart.current;
      const scrolledToBottomToStart = scrollTop + clientHeight >= scrollHeight - 10;

      if (scrolledToBottomToStart) {
        const queryToDosToStart = await get_todos(http, "toStart", offSetToStart);
        setListTodosToStart(listToDosToStart.concat(queryToDosToStart.toDos));
        setOffSetToStart(offSetToStart + queryToDosToStart.totalHits);
      }
    }
  };

  const handleScrollInProgress = async () => {
    if (panelElementInProgress?.current) {
      const { scrollTop, scrollHeight, clientHeight } = panelElementInProgress.current;
      const scrolledToBottomInProgress = scrollTop + clientHeight >= scrollHeight - 10;

      if (scrolledToBottomInProgress) {
        const queryToDosInProgress = await get_todos(http, "inProgress", offSetInProgress);
        setListTodosInProgress(listToDosInProgress.concat(queryToDosInProgress.toDos));
        setOffSetInProgress(offSetInProgress + queryToDosInProgress.totalHits);
      }
    }
  };

  const handleScrollCompleted = async () => {
    if (panelElementCompleted?.current) {
      const { scrollTop, scrollHeight, clientHeight } = panelElementCompleted.current;
      const scrolledToBottomCompleted = scrollTop + clientHeight >= scrollHeight - 10;

      if (scrolledToBottomCompleted) {
        const queryToDosCompleted = await get_todos(http, "completed", offSetCompleted);
        setListTodosCompleted(listToDosCompleted.concat(queryToDosCompleted.toDos));
        setOffSetCompleted(offSetCompleted + queryToDosCompleted.totalHits);
      }
    }
  };
  // Renderizar los paneles con los todos correspondientes
  return (
    <EuiFlexGroup wrap>
      <EuiFlexGroup style={{ padding: '16px' }} gutterSize="l">
        <EuiFlexItem>
          <EuiPanel>
            <h2>To Start ({offSetToStart})</h2>
          </EuiPanel>
          <EuiPanel>
            <div className="my-panel  my-panel-scroll" onScroll={handleScrollToStart} ref={panelElementToStart}>
              <div className="my-panel-content" >
                {listToDosToStart.sort((a, b) => a._source.date - b._source.date).map(toDo => (
                  <EuiFlexGroup key={toDo._id} style={{ padding: '16px' }} gutterSize="l">
                    <EuiFlexItem>
                      <EuiPanel className="my-panel">
                        <EuiText>
                          <h1>{toDo._source.title}</h1>
                          <EuiSpacer />
                          <EuiText>
                            <p>{toDo._source.description}</p>
                          </EuiText>
                        </EuiText>
                        <div className="my-panel-actions">
                          <ToDoDeleteButton toDo={toDo} listener={setToStartListener}/>
                          <ToDoUpdateForm toDo={toDo} setToStartListener={setToStartListener} setInProgressListener={setInProgressListener} setCompletedListener={setCompletedListener}/>
                        </div>
                      </EuiPanel>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                ))}
              </div>
            </div>
          </EuiPanel>
          <EuiPanel>
            <div className="my-form-add">
              <FormToDo http={http} toDoState={"toStart"} listener={setToStartListener}></FormToDo>
            </div>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ padding: '16px' }} gutterSize="l">
        <EuiFlexItem>
          <EuiPanel>
            <h2>In Progress</h2>
          </EuiPanel>
          <EuiPanel>
            <div className="my-panel my-panel-scroll" onScroll={handleScrollInProgress} ref={panelElementInProgress}>
              <div className="my-panel-content">
                {listToDosInProgress.sort((a, b) => a._source.date - b._source.date).map(toDo => (
                  <EuiFlexGroup key={toDo._id} style={{ padding: '16px' }} gutterSize="l">
                    <EuiFlexItem>
                      <EuiPanel className="my-panel">
                        <EuiText>
                          <h1>{toDo._source.title}</h1>
                          <EuiSpacer />
                          <EuiText>
                            <p>{toDo._source.description}</p>
                          </EuiText>
                        </EuiText>
                        <div className="my-panel-actions">
                          <ToDoDeleteButton toDo={toDo} listener={setInProgressListener} />
                          <ToDoUpdateForm toDo={toDo} setToStartListener={setToStartListener} setInProgressListener={setInProgressListener} setCompletedListener={setCompletedListener}/>
                        </div>
                      </EuiPanel>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                ))}
              </div>
            </div>
          </EuiPanel>
          <EuiPanel>
            <div className="my-form-add">
              <FormToDo http={http} listener={setInProgressListener} toDoState={"inProgress"}></FormToDo>
            </div>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ padding: '16px' }} gutterSize="l">
        <EuiFlexItem>
          <EuiPanel>
            <h2>Completed</h2>
          </EuiPanel>
          <EuiPanel>
            <div className="my-panel my-panel-scroll" onScroll={handleScrollCompleted} ref={panelElementCompleted}>
              <div className="my-panel-content">
                {listToDosCompleted.sort((a, b) => a._source.date - b._source.date).map(toDo => (
                  <EuiFlexGroup key={toDo._id} style={{ padding: '16px' }} gutterSize="l">
                    <EuiFlexItem>
                      <EuiPanel className="my-panel">
                        <EuiText>
                          <h1>{toDo._source.title}</h1>
                          <EuiSpacer />
                          <EuiText>
                            <p>{toDo._source.description}</p>
                          </EuiText>
                        </EuiText>
                        <div className="my-panel-actions">
                          <ToDoDeleteButton toDo={toDo} listener={setCompletedListener} />
                          <ToDoUpdateForm toDo={toDo} setToStartListener={setToStartListener} setInProgressListener={setInProgressListener} setCompletedListener={setCompletedListener}/>
                        </div>
                      </EuiPanel>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                ))}
              </div>
            </div>
          </EuiPanel>
          <EuiPanel>
            <div className="my-form-add">
              <FormToDo http={http} listener={setCompletedListener} toDoState={"completed"}></FormToDo>
            </div>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  );

}

