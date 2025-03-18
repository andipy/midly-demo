import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import Carousel from '../layout/carousel.layout'
import useFanclub from '../utils/get-fanclub.hooks'
const TabFanclub = ({artist}) => {
    
    const {pathname } = useLocation()
    const navigate = useNavigate()
    const {currentFan} = useContext(CurrentFanContext)
    const {currentArtist} = useContext(CurrentArtistContext)

    const fanclub = useFanclub(artist?.id)

    //messaggi non letti
    const [unreadMessages, setUnreadMessages] = useState()

    useEffect(() => {
        const targetId = pathname.includes('artist-app') ? currentArtist?.id : currentFan?.id

        const unreadMessagesCount = fanclub?.messages?.filter((message) => {
            return message.userId !== targetId && !message.read.includes(targetId)
        }).length

        setUnreadMessages(unreadMessagesCount)
        console.log(`${unreadMessagesCount} messaggi non letti`)
    }, [fanclub])
    
    return (
        <Carousel>
            {
                fanclub?.isActive ?
                <>
                    {/* MAJOR CHANGES */}
                    {/* <div className={`${pathname.includes('dashboard')? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('dashboard')}}> 
                        <p className='fsize-xs-2'>Bacheca</p>
                    </div> */}
                    {pathname.includes('sfera-ebbasta') && (artist?.flashLeaderboard.status === 'ONGOING' || artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'CLOSED_VISIBLE') &&
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
                
                    <div className={`${pathname.includes('events') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('events')}}> 
                        <p className=' fsize-xs-2 '>Eventi</p>
                    </div>
                    <div className={`${pathname.includes('store') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('store')}}> 
                        <p className='fsize-xs-2'>Store</p>
                    </div>
                    <div className={`${pathname.includes('group-chat') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink d-flex-row j-c-center align-items-center gap-0_25em`} onClick={() => {navigate('group-chat')}}> 
                        
                        <p className='fsize-xs-2'>Chat di gruppo</p>
                        {
                            unreadMessages > 0 &&
                            <div className={`bg-acid-lime avatar-16  border-radius-100 d-flex-row j-c-center align-items-center`}>
                                <p className='fsize-xs-0 f-w-600 black'>{unreadMessages}</p>
                            </div>
                        }
                    </div>
                    <div className={`${pathname.includes('letters') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('letters')}}> 
                        <p className='fsize-xs-2 no-shrink'>Fan messages</p>
                    </div>

                    <div className={`${pathname.includes('forum') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('forum')}}> 
                        <p className='fsize-xs-2'>Forum</p>
                    </div>

                    <div className={`${pathname.includes('leaderboard') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink`} onClick={() => {navigate('leaderboard')}}> 
                        <p className='fsize-xs-2'>Classifica</p>
                    </div>
                    
                </>
                :
                <>
                    <div className={`${pathname.includes('leaderboard-streaming') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink w-50 d-flex-row j-c-center align-items-center`} onClick={() => {navigate('leaderboard-streaming')}}> 
                        <p className='fsize-xs-2'>Classifica</p>
                    </div>
                    {
                        artist?.chatIsActive &&
                        <div className={`${pathname.includes('group-chat') ? 'bg-acid-lime black f-w-600' : 'bg-dark-soft-3 white f-w-500'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02 no-shrink w-50 d-flex-row j-c-center align-items-center gap-0_25em`} onClick={() => {navigate('group-chat')}}> 
                            <p className='fsize-xs-2'>Chat di gruppo</p>
                            {
                                unreadMessages > 0 &&
                                <div className={`bg-acid-lime avatar-16  border-radius-100 d-flex-row j-c-center align-items-center`}>
                                    <p className='fsize-xs-0 f-w-600 black'>{unreadMessages}</p>
                                </div>
                            }
                        </div>

                    }
                </>
            }
                 
        </Carousel>
      )
}

export default TabFanclub