import Status from "../types/status.js";
import TaskCardButton from "./taskCardButton.jsx";

const TaskCard = ({task, onDecreaseTask, onIncreaseTask, onDeleteTask}) => {

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
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case Status.COMPLETED:
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const handleDeleteTask = () => {
        onDeleteTask(task)
    }

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                        {task.title}
                    </h3>
                    <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                    </span>
                </div>

                <div
                    className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                    <TaskCardButton
                        onClick={handleDecreaseTask}
                        isDisabled={task.status === Status.PENDING}
                        className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                    >
                        ←
                    </TaskCardButton>

                    <TaskCardButton
                        onClick={handleIncreaseStatus}
                        isDisabled={task.status === Status.COMPLETED}
                        className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                    >
                        →
                    </TaskCardButton>

                    <button
                        className="w-8 h-8 rounded-md bg-error-500 hover:bg-error-600 text-white transition-colors duration-150 flex items-center justify-center group/delete"
                        onClick={handleDeleteTask}
                        title="Delete task"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
                {task.description}
            </p>
        </div>
    )
}

export default TaskCard