const TaskCard = ({task, onDecreaseTask, onIncreaseTask}) => {


    const handleIncreaseStatus = () => {
        if (task.status === "pending" || task.status === "in_progress") {
            onIncreaseTask(task)
        }
    }

    const handleDecreaseTask = () => {
        if (task.status === "completed" || task.status === "in_progress") {
            onDecreaseTask(task)
        }
    }


    return (
        <div className="flex flex-col bg-white shadow-xl p-4 gap-2">
            <div className={"flex justify-between"}>
                <h3 className="text-2xl">{task.title}</h3>
                <div className={"flex gap-2"}>
                    <button onClick={handleDecreaseTask}
                            className={`rounded px-2 max-h-8 max-w-8 ${task.status !== "pending" ? "bg-primary-600 text-white" : "bg-neutral-200"} `}>&#8592;</button>
                    <button onClick={handleIncreaseStatus}
                            className={`rounded px-2 max-h-8 max-w-8 ${task.status !== "completed" ? "bg-primary-600 text-white" : "bg-neutral-200"} `}>&#8594;</button>
                </div>
            </div>

            <p>{task.description}</p>
        </div>
    )

}

export default TaskCard