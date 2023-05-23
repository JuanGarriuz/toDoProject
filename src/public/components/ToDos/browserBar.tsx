import React, { useState } from 'react';
import { EuiFieldSearch, EuiListGroup, EuiListGroupItem } from '@elastic/eui';
import { todo_interface } from './interfaces/todo_interface';

export default function toDoBrowser(listToDos:{listToDos:todo_interface[]}){
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<todo_interface[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchText(value);
        console.log(listToDos);
        const filteredResults = listToDos.listToDos.filter((toDo) =>
            toDo._source.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <div>
            <EuiFieldSearch
                value={searchText}
                placeholder="Search..."
                onChange={handleSearchChange}
            />
            {(
                <EuiListGroup>
                    {searchResults.map((data) => (
                        <EuiListGroupItem key={data._id} label={data._source.title}>{data._source.title}</EuiListGroupItem>
                    ))}
                </EuiListGroup>
            )}
        </div>
    );
};
