import React from 'react'
import '../styles/style.css'

export default function Task({ task, toggleTask }) {

    function handleTaskClick() {
        toggleTask(task.id)
    }

    return (
        <div className="task-container">
            <input type="checkbox" id="checkbox" checked={task.complete} onChange={handleTaskClick} />
            <label for="checkbox">{task.name}</label>
        </div>
    )
}
