import data from './data.json'
import {useEffect, useRef, useState} from "react";
import TaskColumn from "./Components/taskColumn.jsx";
import CreateTaskDialog from "./Components/createTaskDialog.jsx";


const dataTasks = data.tasks

function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const dialogRef = useRef(null)
    const [tasks, setTasks] = useState(dataTasks)

    useEffect(() => {
        const dialog = dialogRef.current

        const handleDialogClose = () => {
            setIsDialogOpen(false) // Reset state when dialog closes
        }

        dialog?.addEventListener('close', handleDialogClose)
        return () => dialog?.removeEventListener('close', handleDialogClose)
    }, [])

    const pendingTasks = tasks.filter((task) => task.status === "pending")
    const inProgressTasks = tasks.filter((task) => task.status === "in_progress")
    const completedTasks = tasks.filter((task) => task.status === "completed")

    const handleAddTask = (task) => {
        setTasks([...tasks, task])
    }

    const handleIncreaseTask = (todo) => {
        const updatedTasks = [...tasks]
        const myTodo = updatedTasks.find(t => t.id === todo.id)
        if (myTodo.status === "pending") {
            myTodo.status = "in_progress"
        } else if (myTodo.status === "in_progress") {
            myTodo.status = "completed"
        }
        setTasks(updatedTasks)
    }

    const handleDecreaseTask = (todo) => {
        const updatedTasks = [...tasks]
        const myTodo = updatedTasks.find(t => t.id === todo.id)
        if (myTodo.status === "in_progress") {
            myTodo.status = "pending"
        } else if (myTodo.status === "completed") {
            myTodo.status = "in_progress"
        }
        setTasks(updatedTasks)
    }

    return (
        <div className={"flex flex-col m-4 gap-4"}>

            <CreateTaskDialog dialogRef={dialogRef} isOpen={isDialogOpen} onSubmit={handleAddTask} />


            <div className="grid  grid-cols-1 lg:grid-cols-3 gap-2">
                <TaskColumn onIncreaseTask={handleIncreaseTask} onDecreaseTask={handleDecreaseTask} title="Pending"
                            tasks={pendingTasks}/>
                <TaskColumn onIncreaseTask={handleIncreaseTask} onDecreaseTask={handleDecreaseTask} title="In Progress"
                            tasks={inProgressTasks}/>
                <TaskColumn onIncreaseTask={handleIncreaseTask} onDecreaseTask={handleDecreaseTask} title="Done"
                            tasks={completedTasks}/>
            </div>

            <button
                onClick={() => setIsDialogOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-600 hover:primary-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>


        </div>
    )
}

export default App
