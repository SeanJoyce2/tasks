import TaskCard from "./taskCard.jsx";

const TaskColumn = ({tasks, title, onDecreaseTask, onIncreaseTask, onDeleteTask}) => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 min-h-[400px] flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                {title}
            </h3>
            {tasks && tasks.length > 0 && <div className="flex flex-col gap-3 flex-1">
                {tasks.map((task) => (
                    <TaskCard
                        onIncreaseTask={onIncreaseTask}
                        onDecreaseTask={onDecreaseTask}
                        onDeleteTask={onDeleteTask}
                        task={task}
                        key={task.id}
                    />
                ))}
            </div>}

            {(!tasks || tasks.length === 0) && (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                    No tasks yet
                </div>
            )}
        </div>
    )
}

export default TaskColumn