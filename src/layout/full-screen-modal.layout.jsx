import { useLocation } from 'react-router-dom'

const FullScreenModalLayout = ({ children, background }) => {

    const location = useLocation()

    return (
        <div className={`position-fixed bottom-hidden h-98 w-100 border-radius-top-08 z-index-1300 overflow-scroll pb-xs-4 ${background ? background : 'bg-dark'} ${location.state.invokedModal ? 'slide-up' : 'slide-down'}`}>
            {children}
        </div>
    )
}

export default FullScreenModalLayout