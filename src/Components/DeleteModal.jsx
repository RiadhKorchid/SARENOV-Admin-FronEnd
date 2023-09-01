import { FaTimes } from "react-icons/fa"
import { useRef } from "react"
import { Button, } from "@mui/material"
const DeleteModal = ({ open, closeModal, onClick }) => {

    const popupRef = useRef()
    function handleClose() {
        document.querySelector('.delete-popap').classList.toggle('open')
        closeModal()
    }

    const close = (e) => {
        if (e.target === popupRef.current) {
            handleClose()
        }
    }

    return (
        <div className={open ? "delete-popap open" : "delete-popap"} ref={popupRef} onClick={close}  >

            <div className="modal">
                <div className="modal-header">
                    <h2>Confirmer la suppression </h2>
                    <FaTimes size={20} color="black" cursor={"pointer"} onClick={handleClose} />
                </div>
                <h2>Are you sure you want to continue?</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "0.5rem" }}>

                    <Button variant="contained" color="error" onClick={onClick}>
                        Delete
                    </Button>
                    <Button variant="contained" color="success" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default DeleteModal;