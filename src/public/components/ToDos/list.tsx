import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer, EuiText } from "@elastic/eui"
import React, { RefObject } from 'react';
import { ToDoDeleteButton } from "./toDoDeleteButton";
import { ToDoUpdateForm } from "./toDoUpdateForm";
import { FormToDo } from "./addToDo";
import { todo_interface } from "./interfaces/todo_interface";
import { CoreStart } from "opensearch-dashboards/public";
import SortButton from "./sortToDos";

interface toDoListProps {
    http: CoreStart['http'],
    panelElement: RefObject<HTMLInputElement>,
    listToDos: todo_interface[],
    handleScroll: React.EventHandler<React.UIEvent<HTMLElement>>,
    state: "toStart" | "inProgress" | "completed",
    sortToDosBy: string;
}

interface setListeners {
    setToStartListener: React.Dispatch<React.SetStateAction<number>>,
    setInProgressListener: React.Dispatch<React.SetStateAction<number>>,
    setCompletedListener: React.Dispatch<React.SetStateAction<number>>,
    setSortToDosBy: React.Dispatch<React.SetStateAction<string>>,
}

export default function ToDoList({
    http,
    panelElement,
    listToDos,
    handleScroll,
    state,
    sortToDosBy,
    setToStartListener,
    setInProgressListener,
    setCompletedListener,
    setSortToDosBy,
}: toDoListProps & setListeners) {

    var setListener: any;
    switch (state) {
        case "toStart":
            setListener = setToStartListener;
            break;
        case "inProgress":
            setListener = setInProgressListener;
            break;
        case "completed":
            setListener = setCompletedListener;
            break;
    }

    return (
        <EuiFlexGroup style={{ padding: '16px' }} gutterSize="l">
            <EuiFlexItem>
                <EuiPanel>
                    <h1 className="centerState">{state}</h1>
                    <SortButton setListener={setListener} sortToDosBy={sortToDosBy} setSortToDosBy={setSortToDosBy}></SortButton>
                </EuiPanel>
                <EuiPanel>
                    <div className="my-panel  my-panel-scroll" onScroll={handleScroll} ref={panelElement}>
                        <div className="my-panel-content" >
                            {listToDos.map((toDo: todo_interface) => (
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
                                                <ToDoDeleteButton toDo={toDo} listener={setListener} />
                                                <ToDoUpdateForm toDo={toDo} setToStartListener={setToStartListener} setInProgressListener={setInProgressListener} setCompletedListener={setCompletedListener} />
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
                        <FormToDo http={http} setListener={setListener} toDoState={state} ></FormToDo>
                    </div>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    )

}

