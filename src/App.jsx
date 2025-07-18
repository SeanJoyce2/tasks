import {useEffect, useRef, useState} from "react";
import TaskColumn from "./components/taskColumn.jsx";
import CreateTaskDialog from "./components/createTaskDialog.jsx";
import TasksHeader from "./components/tasksHeader.jsx";
import Status from "./types/status.js";


function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const dialogRef = useRef(null)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const localTasks = localStorage.getItem("tasks")
        if (localTasks) {
            setTasks(JSON.parse(localTasks))
        }
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current

        const handleDialogClose = () => {
            setIsDialogOpen(false)
        }

        dialog?.addEventListener('close', handleDialogClose)
        return () => dialog?.removeEventListener('close', handleDialogClose)
    }, [])

    const pendingTasks = tasks.filter((task) => task.status === Status.PENDING)
    const inProgressTasks = tasks.filter((task) => task.status === Status.IN_PROGRESS)
    const completedTasks = tasks.filter((task) => task.status === Status.COMPLETED)

    const handleAddTask = (task) => {
        handleUpdateTasks([...tasks, task])
    }

    const handleIncreaseTask = (todo) => {
        const updatedTasks = [...tasks]
        const myTodo = updatedTasks.find(t => t.id === todo.id)
        if (myTodo.status === Status.PENDING) {
            myTodo.status = Status.IN_PROGRESS
        } else if (myTodo.status === Status.IN_PROGRESS) {
            myTodo.status = Status.COMPLETED
        }
        handleUpdateTasks(updatedTasks)
    }

    const handleDecreaseTask = (todo) => {
        const updatedTasks = [...tasks]
        const myTodo = updatedTasks.find(t => t.id === todo.id)
        if (myTodo.status === Status.IN_PROGRESS) {
            myTodo.status = Status.PENDING
        } else if (myTodo.status === Status.COMPLETED) {
            myTodo.status = Status.IN_PROGRESS
        }
        handleUpdateTasks(updatedTasks)
    }

    const handleUpdateTasks = (updatedTasks) => {
        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">

            <TasksHeader/>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CreateTaskDialog dialogRef={dialogRef} isOpen={isDialogOpen} onSubmit={handleAddTask}/>

                {/* Task Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <TaskColumn
                        onIncreaseTask={handleIncreaseTask}
                        onDecreaseTask={handleDecreaseTask}
                        title="Pending"
                        tasks={pendingTasks}
                    />
                    <TaskColumn
                        onIncreaseTask={handleIncreaseTask}
                        onDecreaseTask={handleDecreaseTask}
                        title="In Progress"
                        tasks={inProgressTasks}
                    />
                    <TaskColumn
                        onIncreaseTask={handleIncreaseTask}
                        onDecreaseTask={handleDecreaseTask}
                        title="Completed"
                        tasks={completedTasks}
                    />
                </div>
            </main>

            <button
                onClick={() => setIsDialogOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50 "
                title="Add new task"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
            </button>
        </div>
    )
}

export default App