import React from "react"
import './styles.scss';
import { useToDos } from "./hooks/useToDos";
import ToDoList from "./list";
import { EuiFlexGroup } from "@elastic/eui";
import { CoreStart } from "opensearch-dashboards/public";
import ToDoBrowser from './browserBar';

export function AllToDosList({ http }: CoreStart['http']) {
  const [
    panelElementToStart,
    listToDosToStart,
    handleScrollToStart,
    setToStartListener,
    sortToStartToDosBy,
    setSortToStartToDosBy,
    listAllToDosToStart,
  ] = useToDos({ http, state: "toStart" });

  const [
    panelElementInProgress,
    listToDosInProgress,
    handleScrollInProgress,
    setInProgressListener,
    sortInProgressToDosBy,
    setSortInProgressToDosBy,
    listAllToDosInProgress
  ] = useToDos({ http, state: "inProgress" });

  const [
    panelElementCompleted,
    listToDosCompleted,
    handleScrollCompleted,
    setCompletedListener,
    sortCompletedToDosBy,
    setSortCompletedToDosBy,
    listAllToDosCompleted,
  ] = useToDos({ http, state: "completed" });

  const listeners = {
    setToStartListener: setToStartListener,
    setInProgressListener: setInProgressListener,
    setCompletedListener: setCompletedListener
  }

  return (
    <>
      <ToDoBrowser listeners={listeners} listAllToDos={listAllToDosToStart.concat(listAllToDosInProgress.concat(listAllToDosCompleted))}></ToDoBrowser>
      <EuiFlexGroup wrap>
        <ToDoList
          http={http}
          panelElement={panelElementToStart}
          listToDos={listToDosToStart}
          handleScroll={handleScrollToStart}
          state={"toStart"}
          sortToDosBy={sortToStartToDosBy}
          setSortToDosBy={setSortToStartToDosBy}
          {...listeners}>
        </ToDoList>
        <ToDoList
          http={http}
          panelElement={panelElementInProgress}
          listToDos={listToDosInProgress}
          handleScroll={handleScrollInProgress}
          state={"inProgress"}
          sortToDosBy={sortInProgressToDosBy}
          setSortToDosBy={setSortInProgressToDosBy}
          {...listeners}>
        </ToDoList>
        <ToDoList
          http={http}
          panelElement={panelElementCompleted}
          listToDos={listToDosCompleted}
          handleScroll={handleScrollCompleted}
          state={"completed"}
          sortToDosBy={sortCompletedToDosBy}
          setSortToDosBy={setSortCompletedToDosBy}
          {...listeners}>
        </ToDoList>
      </EuiFlexGroup>
    </>
  );

}
