import IconArrowUp from '../images/icons/icon-arrow-up.svg'

const Textbar = ({ currentComment, handleCurrentComment, handleSubmitComment }) => {

    return (
        <section className='text-bar-live-chat'>
            <form className='container d-flex-row align-items-center gap-1em' onSubmit={(e) => handleSubmitComment(e, currentComment)}>
                <input type='text' name='user-message' placeholder='Lascia un commento' onChange={(e) => handleCurrentComment(e)} value={currentComment.content} />
                <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime'><img src={IconArrowUp} /></button>
            </form>                
        </section>
    )
}

export default Textbar;