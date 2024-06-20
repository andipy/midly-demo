import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'

import IconExit from '../images/icons/icon-exit.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconText from '../images/icons/icon-text.svg'
import IconFlip from '../images/icons/icon-flip.svg'
import NavbarMultistep from '../components/navbar-multistep.component'
import AppbarContentCreation from '../components/appbar-content-creation.component.artist'
import TextAreaCaption from '../components/textarea-caption.component.artist'
import LinkArea from '../components/link-area.component.artist'
import SettingsArea from '../components/settings-area.component.artist'


const CameraViewport = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
        
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [error, setError] = useState(null)
    const [recording, setRecording] = useState(false)
    const [videoUrl, setVideoUrl] = useState(null)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [mediaType, setMediaType] = useState('PHOTO')
    const [showTextArea, setShowTextArea] = useState(false)
    const [showLinkArea, setShowLinkArea] = useState(false)
    const [showSettingsArea, setShowSettingsArea] = useState(false)
    const [post, setPost] = useState({
        id: undefined,
        artistId: currentArtist.id,
        media: {
            type: '',
            url: ''
        },
        caption: '',
        link: {
            url: '',
            name: ''
        },
        settings: {
            isPrivate: true
        },
        likes: 0,
        shares: 0,
        comments: [],
        createdAt: undefined
    })

    useEffect(() => {
        const setWrapperHeight = () => {
            const outer = document.querySelector('.outer')
            const wrapper = document.querySelector('.wrapper')
            const navbar = document.querySelector('.nav-multi')
            const appbar = document.querySelector('.appbar-creation')
            const outerHeight = window.innerHeight
            const wrapperHeight = (window.innerHeight - navbar.offsetHeight - appbar.offsetHeight) * .95
            outer.style.setProperty('height', `${outerHeight}px`)
            wrapper.style.setProperty('height', `${wrapperHeight}px`)
        };

        // Initial setting of the height
        setWrapperHeight();

        // Adjust height on resize
        window.addEventListener('resize', setWrapperHeight);

        return () => window.removeEventListener('resize', setWrapperHeight);
    }, []);

    useEffect(() => {
        const getCameraStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
            videoRef.current.srcObject = stream
            }
        } catch (err) {
            setError(err.message)
        }
        }

        getCameraStream()

        return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            let tracks = videoRef.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        }
        }
    }, [photoUrl, videoUrl])

    const handleCapturePhoto = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (canvas && video) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/png')
            setPhotoUrl(dataUrl)
            setPost(prev => ({
                ...prev,
                media: {
                    type: 'PHOTO',
                    url: dataUrl
                }
            }))
        }
    }

    const handleStartRecording = () => {
        const stream = videoRef.current.srcObject
        const options = { mimeType: 'video/webm' }
        mediaRecorderRef.current = new MediaRecorder(stream, options)
        const chunks = []
        mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
        mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const videoUrl = URL.createObjectURL(blob)
        setVideoUrl(videoUrl)
        setPost(prev => ({
            ...prev,
            media: {
                type: 'VIDEO',
                url: videoUrl
             }
        }))
        }
        mediaRecorderRef.current.start()
        setRecording(true)
    }

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop()
        setRecording(false)
    }

    const toggleRecording = () => {
        if (recording) {
        handleStopRecording()
        } else {
        handleStartRecording()
        }
    }

    const clearPhoto = () => {
        setPhotoUrl(null)
    }
    const clearVideo = () => {
        setVideoUrl(null)
    }
    const handlePhotoType = () => {
        setMediaType('PHOTO')
    }
    const handleVideoType = () => {
        setMediaType('VIDEO')
    }

    const handleTextAreaVisibility = () => {
        setShowTextArea(prev => !prev)
    }
    const handleLinkAreaVisibility = () => {
        setShowLinkArea(prev => !prev)
    }
    const handleSettingsAreaVisibility = () => {
        setShowSettingsArea(prev => !prev)
    }

    const handleCaption = (e) => {
        e.preventDefault()
        setPost(prev => ({...prev, caption: e.target.value}))
    }
    const handleLinkUrl = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link,
                url: e.target.value,
            }
        }))
    }
    const handleLinkName = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link,
                name: e.target.value,
            }
        }))
    }
    const handleIsPrivate = () => {
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                isPrivate: !prev.settings.isPrivate,
            }
        }))
    }

    const updatePosts = () => {
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, posts: [...fanclub.posts, { ...post, id: fanclub.posts.length + 1, createdAt: date }] }
                    : fanclub
            )
        );
        navigate('/artist-app/fan-club')
    }


    return (
        <>
        <div className='d-flex-column j-c-center outer'>
        <NavbarMultistep stepNumber={1} totalStepNumber={1} />
        {error && <p>Error accessing the camera: {error}</p>}
        <ContainerDefault containerSpecificStyle={'wrapper position-relative'}>
            <div className='d-flex-column position-absolute right-0 bottom-0 gap-0_5em mb-xs-2 mr-xs-2'>
                {!photoUrl && !videoUrl && 
                    <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                        <img className='avatar-32' src={IconFlip} />
                    </div>
                }
                <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleTextAreaVisibility}>
                    <img className='avatar-32' src={IconText} />
                </div>
                <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleLinkAreaVisibility}>
                    <img className='avatar-32' src={IconLink} />
                </div>
                <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconSettings} onClick={handleSettingsAreaVisibility} />
                </div>

            </div>
            {!photoUrl && !videoUrl &&
                <>
                <video className='border-radius-04 overflow-clip object-fit-cover' ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} />

                {!photoUrl && !videoUrl &&
                    <div className='position-absolute-x bottom-0 d-flex-row align-items-center j-c-center gap-0_5em mb-xs-2'>
                    <span className={`pt-xs-6 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-100 bg-dark-soft-transp75 fsize-xs-2 letter-spacing-1 ${mediaType === 'PHOTO' ? 'white' : 'grey-400'}`} onClick={handlePhotoType}>FOTO</span>
                    <span className={`pt-xs-6 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-100 bg-dark-soft-transp75 fsize-xs-2 letter-spacing-1 ${mediaType === 'VIDEO' ? 'white' : 'grey-400'}`} onClick={handleVideoType}>VIDEO</span>
                </div>
                }
                </>
            }

            {photoUrl ?
                <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                    <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-0 avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={clearPhoto}>
                        <img className='avatar-32' src={IconExit} alt="X" />
                    </div>
                    <img className='border-radius-04 object-fit-cover w-100 h-100' src={photoUrl} />
                </div>
                : videoUrl &&
                <div className='position-relative'  style={{ width: '100%', height: '100%' }}>
                    <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-0 avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={clearVideo}>
                        <img className='avatar-32' src={IconExit} alt="X" />
                    </div>
                    <video className='border-radius-04 object-fit-cover w-100 h-100' src={videoUrl} controls />
                </div>
            }
            </ContainerDefault>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <AppbarContentCreation
                handleCapturePhoto={handleCapturePhoto}
                toggleRecording={toggleRecording}
                recording={recording}
                mediaType={mediaType}
                photoUrl={photoUrl}
                videoUrl={videoUrl}
                updatePosts={updatePosts}
            />
            </div>

            <TextAreaCaption
                showTextArea={showTextArea}
                handleTextAreaVisibility={handleTextAreaVisibility}
                handleCaption={handleCaption}
            />

            <LinkArea
                showLinkArea={showLinkArea}
                handleLinkAreaVisibility={handleLinkAreaVisibility}
                handleLinkUrl={handleLinkUrl}
                handleLinkName={handleLinkName}
            />

            <SettingsArea
                showSettingsArea={showSettingsArea}
                handleSettingsAreaVisibility={handleSettingsAreaVisibility}
                handleIsPrivate={handleIsPrivate}
                isPrivate={post.settings.isPrivate}
            />
        </>
    )
    }

    export default CameraViewport