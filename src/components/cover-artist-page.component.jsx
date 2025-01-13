import { useLocation } from 'react-router-dom'

import Carousel from '../layout/carousel.layout'
import Container from '../layout/container.layout'

import CardQuiz from './card-quiz.component'
import Button from './button.component'

import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import CoverFanclub from './cover-fanclub.component.artist'

const CoverArtistPage = ({ artist, leaderboard, userCompeting, handleCompete, currentFan, fanclub, openMessages}) => {

    const { pathname } = useLocation()
    
    return (
        <header className={`position-relative ${pathname.includes('flash-leaderboard') ? 'position-fixed w-100 z-index-5 top-0 h-xs-20' : 'h-xs-27'}`}>
            { pathname.includes('/fanclub') ?
            <CoverFanclub fanclub={fanclub}/>
            :
            <img
                className='w-100 h-inherit object-fit-cover h-xs-27'
                src={
                    pathname.includes('/flash-leaderboard') ? leaderboard?.image
                    : artist?.image
                }
            />
            }
            

            {pathname.includes('/fanclub') &&
                <Container style={'w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row align-items-center gap-0_5em'}>
                    <div className='position-relative avatar-72'>
                        <img className={`avatar-72 border-radius-100 ${artist?.flashLeaderboard.status === 'ONGOING' ? 'border-lime-6' : 'border-dark-6'}`} src={artist?.image} />                       
                        {artist?.verified && <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />}
                    </div>                    
                    <div className='d-flex-column grow-1 no-shrink j-c-start mt-xs-4'>
                        <h2 className='fsize-xs-4 f-w-600'>{artist?.artistName}</h2>
                        <div className='d-flex-row j-c-space-between w-100 align-items-center'>
                        {
                            pathname.includes('/fanclub')  &&
                            <Button style={'button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 align-self-start w-auto'} label={'Messaggia'} onClick={openMessages} />
                        }  
                        </div>
                    </div>                
                </Container>
            }

            {!pathname.includes('/flash-leaderboard') && !pathname.includes('/fanclub') &&
                <Container style={`w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row gap-0_5em ${userCompeting /* && currentFan?.hasSpotify */ && !pathname.includes('/fanclub') ? 'align-items-end' : 'align-items-center'}`}>
                    <div className='position-relative avatar-72'>
                        <img className={`avatar-72 border-radius-100 ${artist?.flashLeaderboard.status === 'ONGOING' ? 'border-lime-6' : 'border-dark-6'}`} src={artist?.image} />                       
                        {artist?.verified && <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />}
                    </div>
                    <div className='d-flex-column grow-1 no-shrink j-c-start'>
                        <h2 className='fsize-xs-4 f-w-600'>{artist?.artistName}</h2>
                        <div className='d-flex-row j-c-space-between w-100 align-items-center'>
                        {userCompeting  && /* && currentFan?.hasSpotify */
                            <Button style={'button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 align-self-start w-auto'} label={'Esci dalla classifica'} onClick={handleCompete} />
                        }
                        

                        </div>
                        
                    </div>                    
                </Container>
            }              
        </header>
    )
}

export default CoverArtistPage;