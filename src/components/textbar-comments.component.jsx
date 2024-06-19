import { useLocation } from 'react-router-dom'

import IconArrowUp from '../images/icons/icon-arrow-up.svg'

const TextbarComments = ({ currentComment, handleCurrentComment, handleSubmitComment, onClick, className }) => {

    const { pathname } = useLocation()

    return (
        <section className={`text-bar-live-chat ${className}`}>
            <form className='container d-flex-row align-items-center gap-1em' onSubmit={(e) => handleSubmitComment(e, currentComment)}>
                <input
                    type='text'
                    name='user-message'
                    placeholder={
                        !pathname.includes('artist-app') ?
                            'Lascia un commento'
                        :
                            'Lascia un commento ai tuoi fan'
                    }
                    onChange={(e) => handleCurrentComment(e)} value={currentComment.comment}
                    onClick={onClick}
                    
                />
                <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime'><img src={IconArrowUp} /></button>
            </form>                
        </section>
    )
}

export default TextbarComments