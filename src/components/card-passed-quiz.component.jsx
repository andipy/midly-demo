import { useNavigate } from 'react-router-dom';

import IconSuccess from '../images/icons/icon-success-standard.svg';


const CardPassedQuiz = ({ date, image, quizAlreadyPlayed, id }) => {
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

            <div className='d-flex-column'>
                <div className='mt-xs-4 d-flex-column j-c-center align-items-center'>
                    {quizAlreadyPlayed && (
                            <div className='avatar-64 d-flex-row align-items-center j-c-center position-absolute z-index-3 border-radius-100'>
                                <div className='d-flex-row align-items-center j-c-center z-index-4 gap-0_25em'>
                                    <img src={IconSuccess} alt='Y!' />
                                </div>
                                <div className='overlay-card-followed bg-dark-soft-transp75 border-radius-100'></div>
                            </div>
                    )}
                    <div className='avatar-64 bg-dark-gradient border-radius-100 position-relative'>
                        <img className='avatar-64 object-fit-cover border-radius-100' src={image} />
                    </div>
                </div>
                <div className='d-flex-column z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{formatNumber(day) + '/' +formatNumber(month)+ '/'+ year}</h5>
                </div>
            </div>
            ) : (
            <div className='d-flex-column'>
                <a className='mt-xs-4 d-flex-column j-c-center align-items-center' href={``} onClick={handleNavigation}>
                    <div className='avatar-64 bg-dark-gradient border-radius-100 position-relative'>
                        <img className='avatar-64 object-fit-cover border-radius-100' src={image} />
                    </div>
                </a>
                <div className='d-flex-column z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{formatNumber(day) + '/' +formatNumber(month)+ '/'+ year}</h5>
                </div>
            </div>
            )}
        </>
        
    )
}

export default CardPassedQuiz