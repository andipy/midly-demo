import { useNavigate } from 'react-router-dom';

import IconSuccess from '../images/icons/icon-success-standard.svg';


const CardQuiz = ({ artName, image, quizAlreadyPlayed, id }) => {
    const navigate = useNavigate();

    const handleNavigation = (event) => {
        event.preventDefault(); 
        navigate('/quiz', { state: { id } }); 
    };

    return (
        <>
        {quizAlreadyPlayed ? (
            <div className='mr-xs-2'>
                <div className='artist-card-multiple-row-challenge bg-dark-gradient border-radius-1 position-relative'>
                    {quizAlreadyPlayed && (
                        <div className='artist-card-multiple-row-challenge d-flex-row align-items-center j-c-center position-absolute z-index-3'>
                            <div className='d-flex-row align-items-center j-c-center z-index-4 gap-0_25em'>
                                <img src={IconSuccess} alt='Y!' />
                                <h5 className='fsize-xs-1 f-w-300'>Quiz completed!</h5>
                            </div>
                            <div className='overlay-card-followed bg-dark-soft-transp75 border-radius-1'></div>
                        </div>
                    )}
                    <div className='overlay-card bg-dark-overlay-card border-radius-1 z-index-1'></div>
                    <img className='artist-card-multiple-row-challenge object-fit-cover border-radius-1' src={image} />
                    <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                        <h5 className='fsize-xs-2 mb-xs-2 f-w-400 letter-spacing-1'>{artName}</h5>
                    </div>
                </div>
            </div>
            ) : (
            <a className='mr-xs-2' href={``} onClick={handleNavigation}>
                <div className='artist-card-multiple-row-challenge bg-dark-gradient border-radius-1 position-relative'>
                    <div className='overlay-card bg-dark-overlay-card border-radius-1 z-index-1'></div>
                    <img className='artist-card-multiple-row-challenge object-fit-cover border-radius-1' src={image} />
                    <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                        <h5 className='fsize-xs-2 mb-xs-2 f-w-400 letter-spacing-1'>{artName}</h5>
                    </div>
                </div>
            </a>
            )}
        </>
        
    )
}

export default CardQuiz;