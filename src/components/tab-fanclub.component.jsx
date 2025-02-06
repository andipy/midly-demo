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
            
            <div className={`${pathname.includes('posts') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('posts')}}> 
                <p className='fsize-xs-2'>Post dell'artista</p>
            </div>
        
            {/* <div className={`${pathname.includes('events') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('events')}}> 
                <p className=' fsize-xs-2 '>Eventi</p>
            </div> */}
            
            <div className={`${pathname.includes('forum') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('forum')}}> 
                <p className='fsize-xs-2'>Forum</p>
            </div>

            <div className={`${pathname.includes('groupchat') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('groupchat')}}> 
                <p className='fsize-xs-2'>Chat di gruppo</p>
            </div>

            <div className={`${pathname.includes('letters') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('letters')}}> 
                <p className='fsize-xs-2 no-shrink'>Fan messages</p>
            </div>  

            <div className={`${pathname.includes('auraBoard') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('auraBoard')}}> 
                <p className='fsize-xs-2'>Classifica</p>
            </div>     
        </Carousel>
      )
}

export default TabFanclub