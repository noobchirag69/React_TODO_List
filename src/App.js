import { useState, useRef, useEffect } from 'react'
import './styles/style.css'
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.tasks'

const App = () => {
  const [tasks, setTasks] = useState([])
  const taskNameRef = useRef()

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTasks) setTasks(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function toggleTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
  }

  function addTask(e) {
    const name = taskNameRef.current.value
    if (name === '') return
    console.log(name)
    setTasks(prevTasks => {
      return [...prevTasks, { id: uuidv4(), name: name, complete: false }]
    })
    taskNameRef.current.value = null
  }

  function clearTask() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoList tasks={tasks} toggleTask={toggleTask} />
      <input className="taskName" ref={taskNameRef} type="text" placeholder='Add Task' />
      <div className="button-container">
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearTask}>Clear Completed Tasks</button>
      </div>
      <div className="leftTasks">
        <p>Tasks Left: {tasks.filter(task => !task.complete).length}</p>
      </div>
    </div>
  )
}

export default App;
