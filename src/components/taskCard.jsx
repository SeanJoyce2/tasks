import Status from "../types/status.js";
import TaskCardButton from "./taskCardButton.jsx";

const TaskCard = ({task, onDecreaseTask, onIncreaseTask}) => {

    const handleIncreaseStatus = () => {
        if (task.status === Status.PENDING || task.status === Status.IN_PROGRESS) {
            onIncreaseTask(task)
        }
    }

    const handleDecreaseTask = () => {
        if (task.status === Status.COMPLETED || task.status === Status.IN_PROGRESS) {
            onDecreaseTask(task)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case Status.PENDING:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case Status.IN_PROGRESS:
                return 'bg-primary-100 text-primary-800 border-primary-200'
            case Status.COMPLETED:
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {task.title}
                    </h3>
                    <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                    </span>
                </div>

                <div className="flex gap-2 ml-2">
                    <TaskCardButton
                        onClick={handleDecreaseTask}
                        isDisabled={task.status === Status.PENDING}
                    >←</TaskCardButton>

                    <TaskCardButton
                        onClick={handleIncreaseStatus}
                        isDisabled={task.status === Status.COMPLETED}
                    >→</TaskCardButton>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
                {task.description}
            </p>
        </div>
    )
}

export default TaskCard


