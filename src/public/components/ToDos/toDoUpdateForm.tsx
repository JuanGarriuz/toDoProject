import { useState } from 'react';
import {
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiTextArea,
    EuiButton,
    EuiSelect,
    EuiPopoverTitle,
    EuiButtonIcon,
    EuiPopover,
} from '@elastic/eui';
import update_todo from './serverActions/updateToDo';
import React from 'react';
import { todo_interface } from './interfaces/todo_interface';

interface toDoUpdateFormProps {
    toDo: todo_interface,
    setToStartListener:React.Dispatch<React.SetStateAction<number>>,
    setInProgressListener: React.Dispatch<React.SetStateAction<number>>,
    setCompletedListener: React.Dispatch<React.SetStateAction<number>>,
}

export function ToDoUpdateForm({ toDo, setToStartListener, setInProgressListener, setCompletedListener }:toDoUpdateFormProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };
    const [toDoTitle, setToDoTitleValue] = useState(toDo._source.title);
    const [toDoDescription, setToDoDescriptionValue] = useState(toDo._source.description);
    const [selectedState, setSelectedState] = useState(toDo._source.state);

    const handleSelectChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await update_todo(toDo._id, toDoTitle, toDoDescription, selectedState);
        switch (selectedState) {
            case ("toStart"):
                setToStartListener(new Date().getTime());
                break;
            case ("inProgress"):
                setInProgressListener(new Date().getTime());
                break;
            case ("completed"):
                setCompletedListener(new Date().getTime());
                break;
        }
        if (selectedState != toDo._source.state) {
            switch (toDo._source.state) {
                case ("toStart"):
                    setToStartListener(new Date().getTime());
                    break;
                case ("inProgress"):
                    setInProgressListener(new Date().getTime());
                    break;
                case ("completed"):
                    setCompletedListener(new Date().getTime());
                    break;
            }
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setToDoTitleValue(value);
                break;
            case 'description':
                setToDoDescriptionValue(value);
                break;
            default:
                break;
        }
    };

    const stateOptions = [
        { value: 'toStart', text: 'To Start', selected: selectedState === 'toStart' },
        { value: 'inProgress', text: 'In Progress', selected: selectedState === 'inProgress' },
        { value: 'completed', text: 'Completed', selected: selectedState === 'completed' },
    ];

    return (<EuiPopover
        button={
            <EuiButtonIcon
                iconType="pencil"
                onClick={handleButtonClick}
                aria-label="Edit"
            />
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        ownFocus
        anchorPosition="downRight"
    >
        <div style={{ width: '400px', padding: '16px' }}>
            <EuiPopoverTitle>Edit ToDo</EuiPopoverTitle>
            <EuiForm component="form" onSubmit={handleSubmit}>
                <EuiFormRow label="Title">
                    <EuiFieldText
                        name="title"
                        value={toDoTitle}
                        onChange={handleChange}
                        placeholder="Enter a title"
                    />
                </EuiFormRow>
                <EuiFormRow label="Description">
                    <EuiTextArea
                        name="description"
                        value={toDoDescription}
                        onChange={handleChange}
                        placeholder="Enter a description"
                    />
                </EuiFormRow>
                <EuiFormRow label="State">
                    <EuiSelect options={stateOptions} value={selectedState} onChange={handleSelectChange} />
                </EuiFormRow>
                <EuiButton type="submit" fill>
                    Submit
                </EuiButton>
            </EuiForm>
        </div>
    </EuiPopover>

    );
}
