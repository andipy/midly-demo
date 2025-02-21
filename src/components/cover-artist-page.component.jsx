import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Carousel from '../layout/carousel.layout'
import Container from '../layout/container.layout'

import CardQuiz from './card-quiz.component'
import Button from './button.component'

import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import IconOk from '../images/icons/icon-ok.svg'
import IconUnfollow from '../images/icons/icon-unfollow.svg'

const CoverArtistPage = ({ artist, leaderboard, userFollowing, handleFollow, currentFan, fanclub, openMessages, userSubscribed, openSettingsSubscription, openModalSubscription}) => {

    const { pathname } = useLocation()

    const [cover, setCover] = useState({})
    useEffect(() => {
        if (fanclub?.isActive) {
            setCover(fanclub.cover)
        }
        if ( artist ) {
            setCover({
                url: artist.image,
                type: 'IMAGE'
            })
        }
    }, [artist, fanclub])
    
    return (
        <header className={`position-relative ${pathname.includes('flash-leaderboard') ? 'position-fixed w-100 z-index-5 top-0 h-xs-20' : 'h-xs-27'}`}>
            {/* MAJOR CHANGES */}
            {/* { pathname.includes('/fanclub') ?
            <CoverFanclub fanclub={fanclub}/>
            :
            <img
                className='w-100 h-inherit object-fit-cover h-xs-27'
                src={
                    pathname.includes('/flash-leaderboard') ? leaderboard?.image
                    : artist?.image
                }
            />
            } */}

            {cover?.type === 'IMAGE' ?
                <img
                    className='w-100 h-inherit object-fit-cover'
                    src={cover.url}
                />
            : cover?.type === 'VIDEO' &&
                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                    <source src={cover.url} type='video/mp4' />
                </video>
            }
            
            {!pathname.includes('/flash-leaderboard') &&
                <Container style={'w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row align-items-center gap-0_5em'}>
                    
                        <div className='position-relative avatar-72'>
                        <img className={`avatar-72 border-radius-100 ${artist?.flashLeaderboard.status === 'ONGOING' ? 'border-lime-6' : 'border-dark-6'}`} src={artist?.image} />                       
                        {artist?.verified && <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />}
                    </div>
                    <div className={`d-flex-column grow-1 no-shrink j-c-start gap-0_25em ${userSubscribed ? 'mt-xs-4' : userFollowing ? 'mt-xs-4' : ''}`}>

                        <h2 className='fsize-xs-4 f-w-600'>{artist?.artistName}</h2>

                        {userFollowing && !userSubscribed &&
                            <Button
                                style='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 align-self-start w-auto gap-0_25em no-shrink'
                                label='Segui già'
                                onClick={handleFollow}
                            >
                                <img className='avatar-20' src={IconUnfollow} />
                            </Button>
                        }

                        {userSubscribed &&
                            <Button
                                style='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 align-self-start w-auto gap-0_25em no-shrink'
                                label={`Sei abbonato a ${artist?.artistName}`}
                                onClick={openSettingsSubscription}
                            >
                                <img className='avatar-20' src={IconOk} />
                            </Button>
                        }
                    </div>                
                </Container>
            }
            
            {/* MAJOR CHANGES */}
            {/* {pathname.includes('/fanclub') &&
                <Container style={'w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row align-items-center gap-0_5em'}>
                    <div className='position-relative avatar-72'>
                        <img className={`avatar-72 border-radius-100 ${artist?.flashLeaderboard.status === 'ONGOING' ? 'border-lime-6' : 'border-dark-6'}`} src={artist?.image} />                       
                        {artist?.verified && <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />}
                    </div>                    
                    <div className={`d-flex-column grow-1 no-shrink j-c-start ${pathname.includes('/fanclub')  && userSubscribed  && 'mt-xs-6'}`}>
                        <h2 className='fsize-xs-4 f-w-600'>{artist?.artistName}</h2>
                        <div className={`d-flex-row j-c-space-between w-100 align-items-center ${pathname.includes('/fanclub')  && userSubscribed ? 'align-items-end' : 'align-items-center'}`}>
                        {pathname.includes('/fanclub')  && userSubscribed &&
                            <Button style={'button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 align-self-start w-auto gap-0_25em'} label={'Sei abbonato al fanclub'} onClick={openSettingsSubscription}><img src={IconOk}/></Button>
                            // :
                            // <Button style={'button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 align-self-start w-auto black'} label={'Non sei abbonato'} onClick={openModalSubscription}/>
                        }  
                        </div>
                    </div>                
                </Container>
            } */}

            {/* MAJOR CHANGES */}
            {/* {!pathname.includes('/flash-leaderboard') && !pathname.includes('/fanclub') &&
                <Container style={`w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row gap-0_5em ${userFollowing && !pathname.includes('/fanclub') ? 'align-items-end' : 'align-items-center'}`}>
                    <div className='position-relative avatar-72'>
                        <img className={`avatar-72 border-radius-100 ${artist?.flashLeaderboard.status === 'ONGOING' ? 'border-lime-6' : 'border-dark-6'}`} src={artist?.image} />                       
                        {artist?.verified && <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />}
                    </div>
                    <div className='d-flex-column grow-1 no-shrink j-c-start'>
                        <h2 className='fsize-xs-4 f-w-600'>{artist?.artistName}</h2>
                        <div className='d-flex-row j-c-space-between w-100 align-items-center'>
                            {userFollowing  &&
                                <Button style={'button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 align-self-start w-auto'} label={'Esci dalla classifica'} onClick={handleFollow} />
                            }
                        </div>
                    </div>                    
                </Container>
            }     */}
        </header>
    )
}

export default CoverArtistPage