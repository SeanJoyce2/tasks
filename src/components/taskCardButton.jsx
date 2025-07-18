const TaskCardButton = ({children, onClick, isDisabled}) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                            flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                            transition-all duration-200 hover:scale-105 active:scale-95
                            ${!isDisabled
                ? "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }
                        `}
            title="Move backward"
        >
            {children}
        </button>
    )
}

export default TaskCardButton