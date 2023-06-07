import React, { useEffect, useState } from 'react';
import { EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiListGroup, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import { todo_interface } from './interfaces/todo_interface';
import { ToDoDeleteButton } from './toDoDeleteButton';
import { ToDoUpdateForm } from './toDoUpdateForm';


export default function ToDoBrowser({ listeners, listAllToDos }) {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<todo_interface[]>([]);
    

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchText(value);
         if (value.trim() === '') {
            setSearchResults([]);
        } else {
            const filteredResults = listAllToDos.filter((toDo:todo_interface) =>
                toDo._source.title.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };

    return (
        <div>
            <EuiFieldSearch
                value={searchText}
                placeholder="Search..."
                onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
                <EuiListGroup>
                    {searchResults.map((toDo) => {
                        var setListener: React.Dispatch<React.SetStateAction<number>>;
                        switch (toDo._source.state) {
                            case ("toStart"):
                                setListener = listeners.setToStartListener;
                                break;
                            case ("inProgress"):
                                setListener = listeners.setInProgressListener;
                                break;
                            case("completed"):
                                setListener = listeners.setCompletedListener;
                                break;
                            default:
                                setListener = listeners.setToStartListener;
                                break;
                        }
                        return (
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
                                            <ToDoUpdateForm toDo={toDo} setToStartListener={listeners.setToStartListener} setInProgressListener={listeners.setInProgressListener} setCompletedListener={listeners.setCompletedListener} />
                                        </div>
                                    </EuiPanel>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        )
                    })}
                </EuiListGroup>
            )}
        </div>
    );
}
