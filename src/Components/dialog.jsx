import {createPortal} from "react-dom";


const Dialog = ({isOpen, onClose, children}) => {
    if (!isOpen) return null

    return createPortal(
        (<dialog
            open={isOpen}
            aria-modal={true}
            aria-labelledby={"dialog-title"}
            className={"modal-dialog"}
        >
            <h2>Modal Dialog</h2>
            <button onClick={onClose} className={"close-button"}>Close</button>
            <div className={"modal-content"}>{children}</div>

        </dialog>),
        document.body
    )
}

export default Dialog