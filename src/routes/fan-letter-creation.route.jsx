import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import IconExit from '../images/icons/icon-exit.svg'

import IconOk from '../images/icons/icon-ok.svg'

import AppbarContentCreation from '../components/appbar-content-creation.component'

import NavbarFanLetterCreation from '../components/navbar-fan-letter-creation.component'

const FanLetterCreationRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { artist } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
        
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [error, setError] = useState(null)
    const [recording, setRecording] = useState(false)
    const [facingMode, setFacingMode] = useState('user')
    const [video, setVideo] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [contentType, setContentType] = useState('IMAGE')

    const [post, setPost] = useState({
        id: undefined,
        userId: currentFan?.id,
        mode: undefined,
        createdAt: undefined,
        media: {
            type: undefined,
            url: undefined,
        },
        caption: '',
    })

    /* useEffect(() => {
        let newPostId
        const foundPost = fanclubs
            .map(fanclub => {
            newPostId = fanclub.fanLetters.length + 1
            if (fanclub.artistId === state?.id) {
                return fanclub.posts.find(post => post.mode === 'SKETCH')
            }
            return null
            })
            .find(post => post !== null)
    
        if (foundPost) {
            setPost(foundPost)
        } else {
            setPost(prevPost => ({
                ...prevPost,
                id: newPostId, 
                mode: 'SKETCH', 
                }))
        }
    }, [fanclubs]) */

    // this useEffect sets the height of the camera viewport
    useEffect(() => {
        const setWrapperHeight = () => {
            const outer = document.querySelector('.outer')
            const wrapper = document.querySelector('.camera-frame-wrapper')
            const mediaCreationControlBar = document.querySelector('.media-creation-control-bar')
            
            const outerHeight = (window.innerHeight - mediaCreationControlBar.offsetHeight)
            const wrapperHeight = (window.innerHeight - mediaCreationControlBar.offsetHeight)
            outer.style.setProperty('height', `${outerHeight}px`)
            wrapper.style.setProperty('height', `${wrapperHeight}px`)
        }

        // Initial setting of the height
        setWrapperHeight()

        // Adjust height on resize
        window.addEventListener('resize', setWrapperHeight)

        return () => window.removeEventListener('resize', setWrapperHeight)
    }, [])

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode },
                })
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.play() // Explicitly call play() to ensure the stream starts
                }
            } catch (err) {
                setError(err.message)
            }
        }
    
        // Start the camera stream
        getCameraStream()
    
        // Cleanup function to stop all tracks
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks()
                tracks.forEach((track) => track.stop())
            }
        }
    }, [facingMode, contentType])

    const switchCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'))
    }

    const handleCapturePhoto = () => {
        const canvas = canvasRef.current
        const video = videoRef.current

        if (canvas && video) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/png')
            setPhoto({
                type: 'IMAGE',
                url: dataUrl
            })
        }
    }

    const handleStartRecording = () => {
        const stream = videoRef.current.srcObject
        const options = { mimeType: 'video/mp4' }
        mediaRecorderRef.current = new MediaRecorder(stream, options)
        const chunks = []
        mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/mp4' })
            const dataUrl = URL.createObjectURL(blob)
            setVideo({
                type: 'VIDEO',
                url: dataUrl
            })
        }
        mediaRecorderRef.current.start()
        setRecording(true)
    }
    const handleStopRecording = () => {
        mediaRecorderRef.current.stop()
        setRecording(false)
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const dataUrl = URL.createObjectURL(file)
            if ( file.type.startsWith('image/') ) {
                setPhoto({
                    type: 'IMAGE',
                    url: dataUrl
                })
            } else if ( file.type.startsWith('video/') ) {
                setVideo({
                    type: 'VIDEO',
                    url: dataUrl
                })
            } else {
                console.error("Unsupported file type:", file.type)
            }
        }
    }

    const toggleRecording = () => {
        if (recording) {
            handleStopRecording()
        } else {
            handleStartRecording()
        }
    }

    const clearPhoto = (id) => {
        setPhoto(null)
    }
    const clearVideo = (id) => {
        setVideo(null)
    }

    const handlePhotoType = () => {
        setContentType('IMAGE')
    }
    const handleVideoType = () => {
        setContentType('VIDEO')
    }
    const updatePosts = (type) => {
        let currentDate = new Date()
        let newPostId = fanclubs.find(fanclub => fanclub.artistId === artist?.id).fanLetters.length+1
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artist?.id) {        
                    return {
                        ...fanclub,
                        fanLetters: [
                            ...fanclub.fanLetters,
                            {
                                ...post,
                                id: newPostId,
                                mode: 'SKETCH',
                                userId: currentFan?.id,
                                createdAt: currentDate,
                                media: {
                                    ...post.media,
                                    url: type === 'PHOTO' ? photo?.url 
                                        : type === 'VIDEO' ? video?.url 
                                        : null, 
                                    type: type === 'PHOTO' ? photo?.type 
                                        : type === 'VIDEO' ? video?.type
                                        : null
                                }
                            },
                        ],
                    }
                }
                return fanclub
            })
        )

        navigate(`review`, { state: { postId: newPostId, artist: artist } })
    }

    const deletePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artist?.id) {
                    return {
                        ...fanclub,
                        fanLetters: fanclub.fanLetters.filter(elem => elem.mode === 'PUBLISHED')
                    }
                }
                
                return fanclub
            })
        )
    }  


    return (
        <>
            <div className='d-flex-column j-c-center outer'>
                <NavbarFanLetterCreation artist={artist} transparent={true} deletePost={() => deletePost()}/>
                {error && <p className='pt-xs-topbar'>Error accessing the camera: {error}</p>}
                
                <div className='camera-frame-wrapper position-relative'>
                    {!photo && !video &&
                        <>
                            <video
                                className='overflow-clip object-fit-cover'
                                ref={videoRef}
                                autoPlay
                                playsInline
                                style={{ width: '100%', height: '100%' }}
                            />
                        </>
                    }

                    {photo ?
                        <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                            <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                                <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearPhoto(photo.id)}>
                                    <img className='avatar-32' src={IconExit} alt="X" />
                                    <span>Elimina</span>
                                </div>
                                <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => updatePosts('PHOTO')}>
                                    <img className='avatar-32' src={IconOk} alt="X" />
                                    <span>Tieni</span>
                                </div>
                            </div>
                            <img className='object-fit-cover w-100 h-100' src={photo?.url} />
                        </div>
                    : video &&
                        <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                            <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                                <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearVideo(video.id)}>
                                    <img className='avatar-32' src={IconExit} alt="X" />
                                    <span>Elimina</span>
                                </div>
                                <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => updatePosts('VIDEO')}>
                                    <img className='avatar-32' src={IconOk} alt="X" />
                                    <span>Tieni</span>
                                </div>
                            </div>
                            <video className='object-fit-cover w-100 h-100' src={video?.url} controls={false} autoPlay={true} playsInline loop={true} />
                        </div>
                    }

                    <AppbarContentCreation
                        handleCapturePhoto={handleCapturePhoto}
                        toggleRecording={toggleRecording}
                        recording={recording}
                        contentType={contentType}
                        photo={photo}
                        video={video}
                        updatePosts={updatePosts}
                        handlePhotoType={handlePhotoType}
                        handleVideoType={handleVideoType}
                        facingMode={facingMode}
                        switchCamera={switchCamera}
                        handleFileChange={handleFileChange}
                    />
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />

            </div>

            {!video && !photo &&
                <div className='media-creation-control-bar d-flex-row j-c-space-between align-items-center'></div>
            }
        </>
    )
}

export default FanLetterCreationRoute