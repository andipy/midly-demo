import { useState, useEffect } from "react"
const ModalLayout = ({ children, modalOpen }) => {

    const [open, setOpen] = useState(false)
    useEffect(() => {
        if(modalOpen === true) {
            setOpen(true)
        } else if (modalOpen === false) {
            setOpen(false)
        }
    }, [modalOpen])


    return (
        <div className={`position-fixed h-80vh bg-dark-soft w-100 border-radius-top-08 z-index-1100 overflow-scroll left-0 ${open ? 'slide-up' : 'slide-down'}`}>
            {children}
        </div>
    )
}

export default ModalLayout