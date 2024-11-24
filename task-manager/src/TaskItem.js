import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

import './TaskItem.css'

function TaskItem(props) {
    const { taskDetails,onTaskDelete } = props
   const {id,taskStatus,taskText,taskTitle,dueDate}=taskDetails

    return (
        <li className='task-item-container'>
            <div className='text-container'>
                <h1 className='task-title'>Title :</h1>
                <p className='span-text'>{taskTitle.toUpperCase()}</p>
                <h1 className='task-title'>Task Details :</h1>
                <p className='span-text'>{taskText}</p>
            </div>
            <div className='right-container'>
                <p className='date'>{dueDate}</p>
                <p className='status'>Status: <span className='span-status {newClassName}'>{taskStatus}</span></p>
                <MdDeleteOutline className='delete-icon' onClick={() => onTaskDelete(id)} />
            </div>
        </li>
    )
}

export default TaskItem