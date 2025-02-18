import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import IconArrowUp from '../images/icons/icon-arrow-up.svg'
import IconExit from '../images/icons/icon-exit.svg'

import TextbarComments from "../components/textbar-comments.component"
const CommentsModalTextbarLayout = ({ children, modalOpen, handleCurrentComment, submitComment, currentComment, setCurrentComment, inputRef, replyingUser, closeModal, title }) => {
    const { pathname } = useLocation()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (modalOpen === true) {
            setOpen(true)
        }
    }, [modalOpen])

    const close = () => {
        setOpen(false)
        setTimeout(() => {
            closeModal()
        }, 300)
    }

    if (!modalOpen) return null


    return (
        <div className={`position-fixed h-80vh bg-dark-soft w-100 border-radius-top-08 z-index-1100 overflow-scroll left-0  ${open ? ' slide-up' : 'slide-down'}`}>
            <nav className='position-sticky top-0 w-100 d-flex-row align-items-center j-c-center white bg-dark-soft z-index-5 pt-xs-3 pb-xs-3 pt-sm-2 pb-sm-2'>
                <div className='container d-flex-row align-items-center j-c-space-between'>
                    <div className='avatar-32'></div>
    
                    {!pathname.includes('/leaderboard') && <p>{title ? title : 'Comments'}</p>}
    
                    <div className='avatar-32 d-flex-row align-items-center j-c-center bg-dark border-radius-100' onClick={close}>
                        <img className='avatar-28' src={IconExit} alt='X' />
                    </div>
                </div>
            </nav>
            {children}
            <section className={`text-bar-live-chat ${open ? 'bottom-0 position-fixed slide-up' : 'bottom-hidden-textbar-comments slide-down'}`}>
                <form className='container d-flex-row align-items-center gap-1em' onSubmit={(e) => submitComment(e, currentComment)}>
                    <input
                        type='text'
                        name='user-message'
                        ref={inputRef}
                        placeholder={
                            !pathname.includes('artist-app') ?
                                replyingUser ?
                                `Rispondi a @${replyingUser}`
                                :
                                'Lascia un commento'
                            :
                                replyingUser ?
                                `Rispondi a @${replyingUser}`
                                :
                                'Commenta il tuo contenuto'
                            
                        }
                        onChange={(e) => handleCurrentComment(e)} value={currentComment.comment}
                        /* onClick={onClick} */
                        
                    />
                    <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink'><img src={IconArrowUp} /></button>
                </form>                
            </section>
        </div>
    )
}

export default CommentsModalTextbarLayout