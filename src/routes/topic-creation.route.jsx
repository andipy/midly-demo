import { useEffect, useState, useContext, useRef } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { FansContext } from '../contexts/fans.context'

import NavbarTopicCreation from '../components/navbar-topic-creation.component'
import Button from '../components/button.component'
import Container from '../layout/container.layout'
import IconPicture from '../images/icons/icon-picture.svg'
import IconEdit from '../images/icons/icon-edit.svg'
import IconExit from '../images/icons/icon-exit.svg'
import IconPlus from '../images/icons/icon-plus.svg'


const TopicCreationRoute = () => {
    const location = useLocation()
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { setFanclubs } = useContext(FanclubsContext)
    const { fans } = useContext(FansContext)

    const [fan, setFan] = useState()
    useEffect(() => {
        if (currentFan) {
            setFan(fans.find(f => f.id === currentFan.id))
        }
    }, [fans, currentFan])

    const fileInputRef = useRef(null)
        
    const handleIconClick = () => {
        fileInputRef.current.click()
    }
    const [file, setFile] = useState({
        url: undefined,
    })
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        
        if (selectedFile) {
            let fileType = ''
            if (selectedFile.type.split('/')[0] === 'image') {
                fileType = 'IMAGE'
                const imageUrl = URL.createObjectURL(selectedFile)
                setFile({
                    url: imageUrl,
                })
            }
        }
    }

    const [topicTitle, setTopicTitle] = useState('')
    const handleTopicTitle = (e) => {
        e.preventDefault()
        setTopicTitle(e.target.value)
    }
    const [topicDescr, setTopicDescr] = useState('')
    const handleTopicDescr = (e) => {
        e.preventDefault()
        setTopicDescr(e.target.value)
    }

    const [hashtags, setHashtags] = useState([])

    const removeTag = (index) => {
        setHashtags(hashtags.filter((_, i) => i !== index))
    }

    const publishTopic = () => {
        let currentDate = new Date()
        if (!pathname.includes('artist-app')) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub?.artistId === state?.artist.id) {   
                        let newForumId = fanclub?.forum.length + 1
                        return {
                            ...fanclub,
                            forum: [
                                ...fanclub.forum,
                                {                                    
                                    id: newForumId,
                                    userImage: fan?.image,
                                    userName: currentFan?.username,
                                    publisher: {
                                        id: currentFan.id,
                                        type: 'FAN'
                                    },
                                    createdAt: currentDate,
                                    cover: file?.url,
                                    title: topicTitle,
                                    description: topicDescr,
                                    hashtags: hashtags,
                                    likes: [],
                                    comments: [],
                                    saved: [],
                                    weight: 1,
                                    commentsCount: 0
                                },
                            ],
                        }
                    }
                    return fanclub
                })
            )
        }

        navigate(`/artist/${state?.artist.slug}/fanclub/forum`, { state: {artist:state?.artist, tab: 'FORUM'} })
    }

    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if (topicTitle === '' || topicDescr === '') {
            setFilledMandatory(false)
        } else {
            setFilledMandatory(true)
        }
        
    }, [topicTitle, topicDescr])

  return (
    <>
        <NavbarTopicCreation artist={state?.artist} transparent={true}/>
        <Container style={'pt-xs-topbar pb-xs-appbar'}>
            <div>
                <div className='position-relative w-100 mb-xs-6'>
                    <textarea
                        className='input-topic-info fsize-xs-6 f-w-500 w-100 border-bottom-dark-2-0_5 border-radius-none white'
                        type='text'
                        placeholder='Cosa vuoi chiedere?'
                        value={topicTitle}
                        rows={topicTitle.length > 30 ? 2 : 1}
                        maxLength={35}
                        onChange={(e) => handleTopicTitle(e)}
                    />
                    <span className='position-absolute fsize-xs-1 grey-400 bottom-negative-25 right-2 z-index-999'>{topicTitle.length}/35</span>
                </div>
                
                <textarea
                    className='input-topic-info fsize-xs-3 f-w-400 w-100 border-bottom-dark-2-0_5 border-radius-none white mb-xs-10'
                    type='text'
                    placeholder="Approfondisci il tuo punto di vista"
                    value={topicDescr}
                    rows={6}
                    onChange={(e) => handleTopicDescr(e)}
                />

                <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>HASHTAG</label>

                <div className='d-flex-row j-c-start align-items-center gap-0_5em mt-xs-4 ml-xs-4'>
                    {
                        hashtags.map(((hashtag, index) =>
                            <div className='bg-acid-lime-op-75 pr-xs-2 pl-xs-2 pt-xs-1 pb-xs-1 border-radius-02 d-flex-row j-c-center align-items-center gap-0_5em'>
                                <p className='fsize-xs-1 f-w-300 lime-400'>#{hashtag}</p>
                                <div className='bg-dark-gradient avatar-16 d-flex-row j-c-center align-items-center pr-xs-2 pl-xs-2 pt-xs-1 pb-xs-1 border-radius-100 ' onClick={() => removeTag(index)}>
                                    <img className='avatar-16' src={IconExit}/>
                                </div>
                            </div>
                        ))
                    }
                    <div className='bg-dark-gradient avatar-28 d-flex-row j-c-center align-items-center pr-xs-2 pl-xs-2 pt-xs-1 pb-xs-1 border-radius-100 ' onClick={() => navigate(`hashtags`, { state: { invokedModal: true } })}>
                        <img className='avatar-28' src={IconPlus}/>
                    </div>
                </div>
                
            </div>
            
            {
                file.url &&
                <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 position-relative mt-xs-12'>
                    
                    <img className='w-100 h-100 object-fit-cover' src={file.url} />
                    <div className='bg-black-transp50 d-flex-row j-c-center align-items-center  border-radius-100 position-absolute top-5 right-5 pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-1 gap-0_25em' onClick={ () => setFile({url: undefined})}>
                        <img className='avatar-24' src={IconExit}/>
                    </div>
                    <div className='bg-black-transp50 d-flex-row j-c-center align-items-center  border-radius-100 position-absolute bottom-5 right-5 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 gap-0_25em' onClick={handleIconClick}>
                        <img className='avatar-24' src={IconEdit}/>
                        <span className='fsize-xs-2'>Modifica</span>
                    </div>
                    <input
                        className='d-none'
                        type='file'
                        ref={fileInputRef}
                        accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                        onChange={handleFileChange} 
                    />
                </div>
            }
            {
                !file.url &&
                    <div className='d-flex-row position-absolute bottom-12 ml-xs-4'>
                        <img className='avatar-28' src={IconPicture} onClick={handleIconClick}/>
                        <input
                            className='d-none'
                            type='file'
                            ref={fileInputRef}
                            accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                            onChange={handleFileChange} 
                        />
                    </div>
            }
            
        </Container>
        <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
            <Container>
                <Button
                    disabled={filledMandatory ? false : true}
                    style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                    onClick={publishTopic}
                    label='Pubblica'
                >
                </Button>
            </Container>
        </div>
        <Outlet context={[hashtags, setHashtags]}/>
        
    </>
   
  )
}

export default TopicCreationRoute