import { useLocation } from 'react-router-dom';

const Tab = () => {

    const location = useLocation();

    return (
        <div className='d-flex-row bg-dark-900'>                
            <div className='d-flex-column grow-1 align-items-center'>
                <span className={`${location.pathname.includes('leaderboard') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-3 mb-xs-2`}>Classifica</span>
                <span className={`${location.pathname.includes('leaderboard') ? 'bg-acid-lime' : 'bg-grey-500'} marker`}></span>
            </div>
            <div className='d-flex-column grow-1 align-items-center'>
                <span className={`${location.pathname.includes('fan-club') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-3 mb-xs-2`}>Fan club</span>
                <span className={`${location.pathname.includes('fan-club') ? 'bg-acid-lime' : 'bg-grey-500'} marker`}></span>
            </div>
        </div>
    )
}

export default Tab;