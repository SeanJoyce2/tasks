import {useLayoutEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

const CreateTaskDialog = ({onSubmit, isOpen, dialogRef}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    }, [isOpen, dialogRef]);

    const handleFormSubmit = (e) => {

        const isValid = title.trim() !== "" && description.trim() !== ""
        if (!isValid) {
            e.preventDefault()
            return
        }

        onSubmit({
            id: uuidv4(),
            title,
            description,
            status: "pending"
        })
        setTitle("")
        setDescription("")

    }


    return (
        <dialog
            ref={dialogRef}
            className="backdrop:bg-black/50 bg-white rounded-lg shadow-xl border-0 p-0 max-w-md w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <form
                method="dialog"
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-4 p-6"
            >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Task</h3>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Title *</label>
                    <input
                        placeholder="Enter task title..."
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                        placeholder="Enter task description..."
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </dialog>
    )
}

export default CreateTaskDialog