import { useLocation } from 'react-router-dom'

import IconArrowUp from '../images/icons/icon-arrow-up.svg'

const TextbarComments = ({ currentComment, handleCurrentComment, handleSubmitComment, onClick, modalOpen, inputRef, replyingUser }) => {
    const { pathname } = useLocation()

    return (
        <section className={`text-bar-live-chat ${modalOpen ? 'bottom-0 position-fixed' : 'bottom-hidden-textbar-comments'}`}>
            <form className='container d-flex-row align-items-center gap-1em' onSubmit={(e) => handleSubmitComment(e, currentComment)}>
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
                    onClick={onClick}
                    
                />
                <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink'><img src={IconArrowUp} /></button>
            </form>                
        </section>
    )
}

export default TextbarComments