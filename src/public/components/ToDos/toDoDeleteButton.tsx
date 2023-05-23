import React from "react"
import delete_todo from './serverActions/deleteToDo'
import { EuiButtonIcon } from "@elastic/eui";
import { todo_interface } from "./interfaces/todo_interface";

interface toDoDeleteProps{
    toDo:todo_interface,
    listener: React.Dispatch<React.SetStateAction<number>>
}

export function ToDoDeleteButton( {toDo, listener}:toDoDeleteProps ) {

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
