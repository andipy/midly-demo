
const MessageChatConcert = ({message, currentUserId, color}) => {
    const formatTimeFromCreatedAt = (createdAt) => {
        const date = new Date(createdAt)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }
  return (
    <>
    {message?.userId === currentUserId ?
    <div className="d-flex-column j-c-center align-items-end mb-xs-4 ">
        <div className="bg-dark-soft-2 border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-20"> 
            {/* <div className="d-flex-row j-c-start align-items-center ">
                {message?.userImage ? 
                    <img
                        src={message?.userImage}
                        className='avatar-28 border-radius-100'
                    />
                : 
                    <div className='avatar-28 position-relative'>
                        <div className='d-flex-row j-c-center align-items-center avatar-28 border-radius-100 bg-purple-400'>
                            <h5 className='f-w-500 fsize-xs-6'>
                                {message?.username.charAt(0).toUpperCase()}
                            </h5>
                        </div>
                    </div>
                    
                }
                <span className="message-username">{message.username}</span>

            </div> */}
            <p className="t-align-start">{message.content}</p>
        </div>
        <div className="d-flex-row justify-content-start align-items-center mt-xs-1">
            <p className="message-time">{formatTimeFromCreatedAt(message.createdAt)}</p>
        </div>
        
    </div>
    :
    <>
    <div className="d-flex-row j-c-start align-items-end mb-xs-4">
        {message?.userImage ? 
            <img
                src={message?.userImage}
                className='avatar-28 border-radius-100 mb-xs-8'
            />
        : 
            <div className='avatar-28 position-relative mb-xs-8'>
                <div className={`d-flex-row j-c-center align-items-center avatar-28 border-radius-100 ${color?.icon}`}>
                    <h5 className='f-w-500 fsize-xs-6'>
                        {message?.username.charAt(0).toUpperCase()}
                    </h5>
                </div>
            </div>
                        
        }
        <div className='d-flex-column j-c-start align-items-start w-100'>
            <div className="bg-dark-gradient border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-2 mr-xs-20"> 
                <div className="d-flex-row j-c-start align-items-center ">
                    
                    <span className={`t-align-start ${color?.text}`}>{message.username}</span>
                    {/* <span className="message-timestamp">{new Date(message.createdAt).toLocaleString()}</span> */}
                </div>
                <p className="t-align-start">{message.content}</p>
            </div>
            <div className="d-flex-row justify-content-start align-items-center mt-xs-1">
                <p className="message-time">{formatTimeFromCreatedAt(message.createdAt)}</p>
            </div>
        </div>
    </div>
    </>
    }
    </>
    
  )
}

export default MessageChatConcert