import { useLocation, useNavigate } from 'react-router-dom'

const Tab = ({ artist }) => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className='d-flex-row bg-dark mb-xs-2'>               
            <div className='d-flex-column grow-1 align-items-center'onClick={() => navigate(`/artist/${artist.slug}/leaderboard`, { state: artist })}>
                <span className={`${location.pathname.includes('leaderboard') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-3 mb-xs-2`}>Classifica</span>
                <span className={`${location.pathname.includes('leaderboard') ? 'bg-acid-lime' : 'bg-grey-500'} marker`}></span>
            </div>
            <div className='d-flex-column grow-1 align-items-center' onClick={() => navigate(`/artist/${artist.slug}/fanclub`, { state: artist })}>
                <span className={`${location.pathname.includes('fanclub') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-3 mb-xs-2`}>Fan club</span>
                <span className={`${location.pathname.includes('fanclub') ? 'bg-acid-lime' : 'bg-grey-500'} marker`}></span>
            </div>
        </div>
    )
}

export default Tab