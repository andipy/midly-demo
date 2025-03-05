import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"

const LikeUser = ({user, type}) => {
    const location = useLocation()
    const {currentFan} = useContext(CurrentFanContext)
  return (
        <div className={`d-flex-column mb-xs-6`}>
            <div 
                className={`d-flex-row j-c-space-between align-items-center w-100`} 
            >
                <div className={`d-flex-row j-c-start align-items-center  gap-0_5em w-100`}>
                    {
                    user?.image ?
                        <img src={user?.image} className='avatar-36 border-radius-100'/>
                        :
                        <div className='avatar-36 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400' >
                                <h5 className='f-w-500 fsize-xs-3'>
                                    {user?.username.charAt(0).toUpperCase()}
                                </h5>
                            </div>
                        </div>
                    }
                    <p className="fsize-xs-3 f-w-600 grey-250">{user?.username}</p>
                </div>
                {/* {
                    !location.pathname.includes('artist-app') &&
                    <>
                    {user.id !== currentFan.id &&
                    <div className="bg-dark-soft-2 d-flex-row no-shrink border-radius-08 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2">
                        <p className="fsize-xs-1 f-w-300 ">Vedi profilo</p>
                    </div>
                    }
                    </>
                    
                } */}
                
                
            </div>
        </div>
  )
}

export default LikeUser