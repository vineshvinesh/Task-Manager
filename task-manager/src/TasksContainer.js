import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskItem from './TaskItem';
import './TaskContainer.css'

function TasksContainer() {

    const [titleInput, setTitleInput] = useState("")
    const [taskInput, setTaskInput] = useState("")
    const [taskStatus, setTaskStatus] = useState("PENDING")
    const [date, setDate] = useState(new Date());
    const [tasksList, setTasksList] = useState(!localStorage.getItem("tasks") ? [{ id: uuidv4(), taskTitle: "vinesh", taskText: "complete assignment", taskStatus: "PENDING" }] : JSON.parse(localStorage.getItem("tasks")))
    const [activeStatus, setActiveStatus] = useState("ALL")
    const [filteredTasks, setFilteredTasks] = useState(tasksList)


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasksList))
    }, [tasksList]);
    useEffect(() => {
        const storedData = localStorage.getItem("tasks")
        if (storedData) {
            setTasksList(JSON.parse(storedData))
        }
    }, [])

    useEffect(() => {
        if (activeStatus === "ALL") {
            setFilteredTasks(tasksList)
        } else {
            const filtered = tasksList.filter(eachTask => eachTask.taskStatus === activeStatus)
            setFilteredTasks(filtered)
        }

    }, [activeStatus, tasksList])


    const handleTitleInput = (event) => {
        setTitleInput(event.target.value)
    }

    const handleTaskInput = event => {
        setTaskInput(event.target.value)
    }

    const onFormSubmit = event => {
        event.preventDefault()
        if (titleInput.trim() === "" || taskInput.trim() === "") {
            return
        }
        let newTask = {
            id: uuidv4(),
            taskTitle: titleInput,
            taskText: taskInput,
            dueDate: String(date.toLocaleString()),
            taskStatus
        }
        setTasksList(prev => ([...prev, newTask]))
        setTitleInput("")
        setTaskInput("")
        setTaskStatus("PENDING")
    }
    console.log(typeof tasksList[0].dueDate)

    const onTaskDelete = (id) => {
        const newTaskist = tasksList.filter(eachTask => eachTask.id !== id)
        setTasksList(newTaskist)
    }
    console.log(filteredTasks)

    return (
        <div className='bg-container'>
            <h1 className='logo'>Task <span className='logo-span'>Manager</span></h1>
            <div className='tasks-bg-container'>
                <form className='form-container' onSubmit={onFormSubmit}>
                    <label className='label'>Title :<br /><input id="title" type="text" placeholder='Enter Task Title' value={titleInput} onChange={handleTitleInput} /> </label>

                    <label labelFor="task" className='label'>Task :</label>
                    <textarea id="task" rows="4" cols="50" placeholder='Enter Task' value={taskInput} onChange={handleTaskInput}></textarea>
                    <label className='label' >Due Date :<br />
                        <DatePicker selected={date} onChange={(date) => setDate(date)} /></label>
                    <div className='radio-btns-container'>
                        <label ><input type="radio" id="pending" name='task-status' value="PENDING" onChange={e => setTaskStatus(e.target.value)} defaultChecked />PENDING</label>
                        <label ><input type="radio" id="inprogress" name='task-status' value="INPROGRESS" onChange={e => setTaskStatus(e.target.value)} />INPROGRESS </label>
                        <label><input type="radio" id="completed" name='task-status' value="COMPLETED" onChange={e => setTaskStatus(e.target.value)} />COMPLETED </label>
                    </div>
                    <button type="submit" className='add-btn'>Add Task</button>
                </form>

            </div>
            <div className='btm-ele-container'>
            <h1 className='btm-title'>YOUR TASKS</h1>
            <select className='select-container' onChange={e => setActiveStatus(e.target.value)} value={activeStatus} >
                <option value="ALL" defaultChecked>ALL</option>
                <option value="PENDING">PENDING</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>
            <ul className='tasks-container'>
                {filteredTasks.length === 0 ? <h1 className='err-msg'>NO TASK TO SHOW</h1> : filteredTasks.map(eachTask => (
                    <TaskItem key={eachTask.id} taskDetails={eachTask} onTaskDelete={onTaskDelete} />
                ))}

            </ul>
            </div>
        </div>
    )
}

export default TasksContainer