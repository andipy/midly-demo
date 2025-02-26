import { useNavigate, useLocation } from 'react-router-dom'
import Carousel from '../layout/carousel.layout'
const TabFanclub = () => {
    
    const {pathname } = useLocation()
    const navigate = useNavigate()
    
    return (
        <Carousel>
            {/* MAJOR CHANGES */}
            {/* <div className={`${pathname.includes('dashboard')? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('dashboard')}}> 
                <p className='fsize-xs-2'>Bacheca</p>
            </div> */}
            {pathname.includes('sfera-ebbasta') &&
                <div className={`${pathname.includes('flash-chart') ? 'bg-brand-gradient black f-w-600' : 'bg-dark-soft-3 white f-w-500'} d-flex-row align-items-center gap-0_5em pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('flash-chart')}}>
                    {/* {!pathname.includes('flash-chart') && */}
                    <div className={`${pathname.includes('flash-chart') ? 'bg-black' : 'bg-white'} avatar-12 position-relative border-radius-100`}>
                        <div className={`${pathname.includes('flash-chart') ? 'bg-black' : 'bg-white'} position-absolute-x-y flash-animation border-radius-100`}></div>
                    </div>
                    {/* } */}
                    <p className='fsize-xs-2'>Classifica flash</p>
                </div>
            }

            <div className={`${pathname.includes('posts') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('posts')}}> 
                <p className='fsize-xs-2'>Post dell'artista</p>
            </div>
        
            {/* <div className={`${pathname.includes('events') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('events')}}> 
                <p className=' fsize-xs-2 '>Eventi</p>
            </div> */}

            <div className={`${pathname.includes('letters') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('letters')}}> 
                <p className='fsize-xs-2 no-shrink'>Fan messages</p>
            </div>

            <div className={`${pathname.includes('group-chat') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('group-chat')}}> 
                <p className='fsize-xs-2'>Chat di gruppo</p>
            </div>

            <div className={`${pathname.includes('forum') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('forum')}}> 
                <p className='fsize-xs-2'>Forum</p>
            </div>

            <div className={`${pathname.includes('leaderboard') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('leaderboard')}}> 
                <p className='fsize-xs-2'>Classifica</p>
            </div>     
        </Carousel>
      )
}

export default TabFanclub