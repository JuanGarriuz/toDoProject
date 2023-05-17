import React from "react"
import delete_todo from './serverActions/deleteToDo'
import { EuiButtonIcon } from "@elastic/eui";

export function ToDoDeleteButton({ toDo, listener }) {

    const toDoDelete = {
        _id: toDo._id,
    };

    const handleOnClick = async (event) => {
        event.preventDefault();
        await delete_todo(toDoDelete);
        listener(new Date().getTime());
    };

    return (
        <>
            <EuiButtonIcon
                iconType="trash"
                onClick={handleOnClick}
                aria-label="Delete"
                color="danger"
            />
        </>
    )

}
