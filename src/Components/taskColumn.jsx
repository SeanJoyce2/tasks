import TaskCard from "./taskCard.jsx";

const TaskColumn = ({tasks, title, onDecreaseTask, onIncreaseTask}) => {
    return (
        <div className="bg-neutral-100 p-2 rounded-lg flex flex-col gap-2">
            <h3 className="text-2xl text-neutral-600">{title}</h3>
            <div className="flex flex-col gap-2">{tasks && tasks.map((task) => (
                <TaskCard onIncreaseTask={onIncreaseTask} onDecreaseTask={onDecreaseTask} task={task}
                          key={task.id}/>))}</div>
        </div>
    )
}

export default TaskColumn