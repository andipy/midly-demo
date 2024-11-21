import { useLocation } from 'react-router-dom'

const FullScreenModalLayout = ({ children }) => {

    const location = useLocation()

    return (
        <div className={`position-fixed bottom-hidden h-98 bg-dark w-100 border-radius-top-08 z-index-1000 overflow-scroll pb-xs-4 ${location.state.invokedModal ? 'slide-up' : 'slide-down'}`}>
            {children}
        </div>
    )
}

export default FullScreenModalLayout