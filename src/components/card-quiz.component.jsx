const CardQuiz = ({ artistSlug, artName, image, quizAlreadyPlayed }) => {
    return (
        <a className='mr-xs-2' href='#'>
            <div className='artist-card-multiple-row-challenge bg-dark-gradient border-radius-1 position-relative'>
                <div className='overlay-card bg-dark-overlay-card border-radius-1 z-index-1'></div>
                <img className='artist-card-multiple-row-challenge object-fit-cover border-radius-1' src={image} />
                <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500'>{artName}</h5>
                </div>
            </div>
        </a>
    )
}

export default CardQuiz;