import { FaTimes } from "react-icons/fa"
import { useRef } from "react"
const ModalComponent = ({ open, closeModal, title, Component, defaultService }) => {

    const popupRef = useRef()
    /*  function handleClose() {
          document.querySelector('.popap').classList.toggle('open')
          closeModal()
      }*/

    const close = (e) => {
        if (e.target === popupRef.current) {
            closeModal()
        }
    }

    return (<>

        <div className={open ? "popap open" : "popap"} ref={popupRef} onClick={close}  >

            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <FaTimes size={20} color="black" cursor={"pointer"} onClick={closeModal} />
                </div>
                <div className="modal-main">
                    <Component closeModal={closeModal} defaultService={defaultService} />
                </div>
            </div>
        </div>
    </>);
}

export default ModalComponent;