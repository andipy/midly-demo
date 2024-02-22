import { useLocation } from "react-router-dom"

const FullScreenModalLayout = ({ children }) => {

    const location = useLocation()

    return (
        <div className={`position-fixed bottom-hidden h-98vh bg-dark w-100 full-screen-modal ${location.state.invokedModal ? 'slide-up' : 'slide-down'}`}>{children}</div>
    )
}

export default FullScreenModalLayout;