import { useNavigate } from 'react-router-dom';

import IconSuccess from '../images/icons/icon-success-standard.svg';


const CardPassedQuiz = ({ date, artistName, songName, image, quizAlreadyPlayed, id }) => {
    const navigate = useNavigate();

    const handleNavigation = (event) => {
        event.preventDefault(); 
        navigate('/quiz', { state: { id } }); 
    };

    const playDate = new Date(date)

    const day = playDate.getDate()
    const month = playDate.getMonth() +1
    const year = playDate.getFullYear() % 100

    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
    }

    return (
        <>
        {quizAlreadyPlayed ? (
            <a className='d-flex-column border-radius-08 '  href={``} onClick={handleNavigation}>
                {quizAlreadyPlayed && (
                            <div className='artist-card-multiple-row-challenge d-flex-row align-items-center j-c-center position-absolute z-index-3 border-radius-08'>
                                <div className='d-flex-row align-items-center j-c-center z-index-4 gap-0_25em'>
                                    <img src={IconSuccess} alt='Y!' />
                                </div>
                                <div className='overlay-card-followed bg-dark-soft-transp75 border-radius-08'></div>
                            </div>
                )}
                <div className='artist-card-multiple-row-challenge bg-dark-gradient border-radius-1 position-relative'>
                    <div className='overlay-card bg-dark-overlay-card border-radius-1 z-index-1'></div>
                    <img className='artist-card-multiple-row-challenge object-fit-cover border-radius-1' src={image} />

                </div>
                <div className='d-flex-columnj-c-center mt-xs-4 ml-xs-2 overflow-hidden'>
                    <h5 className='fsize-xs-0 mb-xs-2 f-w-500 letter-spacing-0 no-shrink'>{songName}</h5>
                    <h5 className='fsize-xs-0  f-w-500 letter-spacing-0 shrink'>{artistName}</h5>
                </div>
            </a>
            ) : (
            <a className='d-flex-column border-radius-08 '  href={``} onClick={handleNavigation}>
                <div className='artist-card-multiple-row-challenge bg-dark-gradient border-radius-1 position-relative'>
                    <div className='overlay-card bg-dark-overlay-card border-radius-1 z-index-1'></div>
                    <img className='artist-card-multiple-row-challenge object-fit-cover border-radius-1' src={image} />

                </div>
                <div className='d-flex-columnj-c-center mt-xs-4 ml-xs-2 overflow-hidden'>
                    <h5 className='fsize-xs-0 mb-xs-2 f-w-500 letter-spacing-0 no-shrink'>{songName}</h5>
                    <h5 className='fsize-xs-0  f-w-500 letter-spacing-0 shrink'>{artistName}</h5>
                </div>
            </a>
            
            )}
        </>
        
    )
}

export default CardPassedQuiz