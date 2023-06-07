import { EuiForm, EuiSelect } from '@elastic/eui';
import React from 'react';

interface sortToDosProps {
    setListener: React.Dispatch<React.SetStateAction<number>>,
    sortToDosBy: string,
    setSortToDosBy: React.Dispatch<React.SetStateAction<string>>,
}

export default function SortButton({ setListener, sortToDosBy, setSortToDosBy }: sortToDosProps) {

    const sortOptions = [
        { value: 'dateAsc', text: 'Date Asc', selected: sortToDosBy === 'dateAsc' },
        { value: 'dateDesc', text: 'Date Desc', selected: sortToDosBy === 'dateDesc' },
        { value: 'titleAsc', text: 'Title Asc', selected: sortToDosBy === 'titleAsc' },
        { value: 'titleDesc', text: 'Title Desc', selected: sortToDosBy === 'titleDesc' }

    ];

    /*
        ,
    */

    const handleOptionChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setSortToDosBy(value);
        setListener(new Date().getTime());
    };

    return (
        <EuiForm component="form">
            <EuiSelect className='centerState' options={sortOptions} value={sortToDosBy} onChange={handleOptionChange} />
        </EuiForm>
    );
}