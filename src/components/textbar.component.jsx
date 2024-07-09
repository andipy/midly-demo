import { useLocation } from 'react-router-dom'

import IconArrowUp from '../images/icons/icon-arrow-up.svg'

const Textbar = ({ currentComment, handleCurrentComment, handleSubmitComment, onClick, className }) => {

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
                            'Chatta con i tuoi fan'
                    }
                    onChange={(e) => handleCurrentComment(e)} value={currentComment.content}
                    onClick={onClick}
                />
                <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink'><img src={IconArrowUp} /></button>
            </form>                
        </section>
    )
}

export default Textbar