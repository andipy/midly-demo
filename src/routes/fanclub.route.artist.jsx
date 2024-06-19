import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import Navbar from '../components/navbar.component.artist'
import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IllustrationsFanclubEmpty from '../images/illustrations/illustration-fanclub-empty.svg'

const FanclubRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs } = useContext(FanclubsContext)

    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        fetchThisFanclub()
    }, [fanclubs])

    return (
        <>
            <Navbar fanclub={fanclub} />

            {fanclub?.isActive ?
                <>
                    <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                        <h1>Fanclub</h1>
                    </ContainerDefault>
                    
                    {fanclub.posts.length === 0 ?
                        <FullPageCenter>
                            <img className='w-35' src={IllustrationsFanclubEmpty} alt="" />
                            <h1 className='fsize-xs-6 f-w-500 mb-xs-2 mt-xs-4'>Il tuo fanclub è attivo!</h1>
                            <p className='fsize-xs-4 f-w-200 grey-200 w-70 t-align-center mb-xs-4'>Puoi pubblicare contenuti per i tuoi fan 🎉</p>
                            <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Crea un contenuto' onClick={() => navigate('/artist-app/content-creation')} />

                        </FullPageCenter>
                    :
                        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
                            {fanclub.posts.map(post => 
                                <div className='bg-dark-soft border-radius-04 pt-xs-2 pb-xs-4 pl-xs-2 pr-xs-2 mb-xs-8 position-relative'>
                                    {post.media.type === 'PHOTO' ?
                                        <img className='border-radius-04 w-100 h-100' src={post.media?.url} alt="" />
                                    : post.media.type === 'VIDEO' &&
                                        <video className='border-radius-04 w-100 h-100' src={post.media?.url} controls />
                                    }

                                    <div className='d-flex-row align-items-center j-c-space-between mb-xs-1 mt-xs-1'>
                                        <div className='d-flex-row align-items-center j-c-start gap-0_5em'>
                                            <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                                                <img className='avatar-32' src={IconComments} />
                                            </div>
                                            <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                                                <img className='avatar-32' src={IconLikes} />
                                            </div>
                                            <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                                                <img className='avatar-32' src={IconShare} />
                                            </div>
                                        </div>

                                        <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                                            <img className='avatar-32' src={IconSettings} />
                                        </div>
                                    </div>

                                    <p className='mb-xs-2'>{post.caption && post.caption}</p>
                                    <span className='fsize-xs-1 grey-200 f-w-300'>{post.createdAt}</span>

                                    

                                    {/* <div className='d-flex-row align-items-center j-c-center position-absolute z-index-3 top-0 right-0 avatar-32 bg-dark-soft-transp75 border-radius-100 mt-xs-4 mr-xs-4'>
                                        <img className='avatar-32' src={IconSettings} alt="X" />
                                    </div> */}
                                </div>
                            )}
                        </ContainerDefault>
                    }
                </>
            :
                <FullPageCenter>
                    <ContainerDefault containerSpecificStyle='d-flex-column align-items-center j-c-center gap-1em'>
                        <div className='d-flex-column align-items-center j-c-center'>
                            <img className='avatar-48' src={IconFanclub} />
                            <h4 className='fsize-xs-3 mb-xs-8 letter-spacing-1 f-w-400 white t-align-center mt-xs-4'>Apri il tuo fanclub!</h4>
                        </div>
                        <p className='letter-spacing-1 grey-300 fsize-xs-2 t-align-center w-80'>Pubblica contenuti esclusivi per i tuoi fan in cambio di un abbonamento mensile:</p>
                        <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Attiva fanclub' onClick={() => navigate('/artist-app/fan-club/name')} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <Appbar />
        </>
    )
}

export default FanclubRoute