import React, { useEffect, useState } from "react"
import post_todo from './serverActions/postToDo'
import { EuiButton, EuiButtonIcon, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiPopover, EuiPopoverTitle, EuiTextArea } from "@elastic/eui";

export function FormToDo({ http, listener, toDoState }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };
    const closePopover = () => {
        setIsPopoverOpen(false);
    };
    const [toDoTitle, setToDoTitleValue] = useState('');
    const [toDoDescription, setToDoDescriptionValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (toDoTitle != "" && toDoDescription != "") {
            await post_todo(toDoTitle, toDoDescription, toDoState);
            listener(new Date().getTime());
            setToDoTitleValue("");
            setToDoDescriptionValue("");
        }else{
            alert("Introduce valores para proceder");
        }

    };

    const handleChange = (event) => {
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

    return (
        <EuiPopover
            button={
                <EuiButtonIcon
                    iconType="plusInCircle"
                    onClick={handleButtonClick}
                    aria-label="Add"
                />
            }
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            ownFocus
            anchorPosition="downRight"
        >
            <div style={{ width: '400px', padding: '16px' }}>
                <EuiPopoverTitle>Add ToDo</EuiPopoverTitle>
                <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false}>
                        <EuiForm component="form" onSubmit={handleSubmit}>
                            <EuiFormRow label="Title">
                                <EuiFieldText name="title" value={toDoTitle} onChange={handleChange} />
                            </EuiFormRow>
                            <EuiFormRow label="Description">
                                <EuiTextArea name="description" value={toDoDescription} onChange={handleChange} />
                            </EuiFormRow>
                            <EuiFormRow>
                                <EuiButton type="submit" fill>Submit</EuiButton>
                            </EuiFormRow>
                        </EuiForm>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </EuiPopover>
    );

}
