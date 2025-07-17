import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const CreateTaskForm = ({onSubmitForm}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if(title !== "" || description !== "") {
            onSubmitForm({
                id: uuidv4(),
                title,
                description,
                status: "pending"
            })

            setTitle("")
            setDescription("")
        }

    }

    return (
        <div className="max-w-lg">
            <h3>Create task</h3>
            <form onSubmit={handleFormSubmit} className="flex flex-col  gap-2">
                <input placeholder={"Title*"} required className="border" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder={"Description*"} required className="border" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <button className="border" type="submit">Add task</button>
            </form>
        </div>
    )
}

export default CreateTaskForm;