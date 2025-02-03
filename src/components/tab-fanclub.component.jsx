import { useNavigate, useLocation } from 'react-router-dom'
import Carousel from '../layout/carousel.layout'
const TabFanclub = () => {
    
    const {pathname } = useLocation()
    const navigate = useNavigate()
    
    return (
        <div className='w-100 j-c-space-between align-items-center d-flex-row gap-0_25em overflow-all-hidden'> 
            <Carousel>
                <div className={`${pathname.includes('dashboard')? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {navigate('dashboard')}}> 
                    <p className='fsize-xs-2'>Bacheca</p>
                </div>
                
                <div className={`${pathname.includes('posts') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {navigate('posts')}}> 
                    <p className='fsize-xs-2'>Post</p>
                </div>
            
                {/* <div className={`${pathname.includes('events') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {navigate('events')}}> 
                    <p className=' fsize-xs-2 '>Eventi</p>
                </div> */}
                
                <div className={`${pathname.includes('forum') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {navigate('forum')}}> 
                    <p className='fsize-xs-2'>Forum</p>
                </div>
                <div className={`${pathname.includes('letters') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('letters')}}> 
                    <p className='fsize-xs-2 no-shrink'>Fan messages</p>
                </div>  
                <div className={`${pathname.includes('fanclub/auraBoard') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {navigate('auraBoard')}}> 
                    <p className='fsize-xs-2'>Auraboard</p>
                </div>       
            </Carousel>
        </div>
      )
}

export default TabFanclub