import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Container from '../layout/container.layout'

import IconExit from '../images/icons/icon-exit.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconText from '../images/icons/icon-text.svg'
import IconWaveform from '../images/icons/icon-waveform.png'
import IconOk from '../images/icons/icon-ok.svg'
import IconPlay from '../images/icons/icon-play.svg'
import NavbarMultistep from '../components/navbar-multistep.component'
import AppbarContentCreation from '../components/appbar-content-creation.component.artist'
import TextAreaCaption from '../components/textarea-caption.component.artist'
import LinkArea from '../components/link-area.component.artist'
import SettingsArea from '../components/settings-area.component.artist'
import Button from '../components/button.component'
import AudioPost from '../components/audio-post.component'


const ContentCreationRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
        
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [error, setError] = useState(null)
    const [recording, setRecording] = useState(false)
    const [facingMode, setFacingMode] = useState('user')
    const [video, setVideo] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [audio, setAudio] = useState(null)
    const [textContent, setTextContent] = useState('')
    const [contentType, setContentType] = useState('IMAGE')

    const [showTextArea, setShowTextArea] = useState(false)
    const [showLinkArea, setShowLinkArea] = useState(false)
    const [showSettingsArea, setShowSettingsArea] = useState(false)

    const [post, setPost] = useState({
        id: undefined,
        artistId: currentArtist.id,
        publisher: {},
        mode: undefined,
        createdAt: undefined,
        media: [],
        text: '',
        caption: '',
        link: {
            url: '',
            name: ''
        },
        settings: {
            isPrivate: true,
            isPinned: false,
        },
        likes: [],
        comments: [],
        share: {
            shareCount: 0,
            shareLink: undefined
        }
    })

    useEffect(() => {
        let newPostId
        const foundPost = fanclubs
          .map(fanclub => {
            newPostId = fanclub.posts.length + 1
            if (fanclub.artistId === currentArtist.id) {
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
      }, [fanclubs])

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
    }, [photo, video, facingMode, contentType, audio])

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
                id: post.media.length + 1,
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
                id: post.media.length + 1,
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
                    id: post.media.length + 1,
                    type: 'IMAGE',
                    url: dataUrl
                })
            } else if ( file.type.startsWith('video/') ) {
                setVideo({
                    id: post.media.length + 1,
                    type: 'VIDEO',
                    url: dataUrl
                })
            } else if ( file.type.startsWith('audio/') ) {
                setAudio({
                    id: post.media.length + 1,
                    type: 'AUDIO',
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

    const [recordingAudio, setRecordingAudio] = useState(false)
    
    const audioRecorderRef = useRef(null)
    const [elapsedTime, setElapsedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [audioData, setAudioData] = useState(new Uint8Array(0)) // Dati per la forma d'onda
    const animationRef = useRef(null)
    const analyserRef = useRef(null)

    const handleStartRecordingAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const source = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256 // Maggiore è il valore, più dettagliata sarà la forma d'onda
            analyser.minDecibels = -90
            analyser.maxDecibels = -10
            const dataArray = new Uint8Array(analyser.frequencyBinCount)
    
            source.connect(analyser)
            analyserRef.current = analyser
    
            audioRecorderRef.current = new MediaRecorder(stream)
            const chunks = []
            
            audioRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
            audioRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mp3' })
                const dataUrl = URL.createObjectURL(blob)
                setAudio({
                    id: post.media.length + 1,
                    type: 'AUDIO',
                    url: dataUrl
                })
            }
    
            // Avvio della registrazione
            audioRecorderRef.current.start()
            setRecordingAudio(true)
    
            // Aggiorna forma d'onda e timer
            const startTime = Date.now()
            const update = () => {
                analyser.getByteTimeDomainData(dataArray)
                setAudioData([...dataArray])

                const elapsedTimeMs = Date.now() - startTime
                const hours = Math.floor(elapsedTimeMs / (1000 * 60 * 60))
                const minutes = Math.floor((elapsedTimeMs % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((elapsedTimeMs % (1000 * 60)) / 1000)
                setElapsedTime({ hours, minutes, seconds })

                animationRef.current = requestAnimationFrame(update)
            }
            update()
        } catch (err) {
            console.error('Errore nella registrazione audio:', err.message)
            setError(err.message)
        }
    }

    const handleModifyPhoto = (id, url) => {
        setPhoto({
            id: id,
            type: 'IMAGE',
            url: url
        })
    }

    const handleModifyVideo = (id, url) => {
        setVideo({
            id: id,
            type: 'VIDEO',
            url: url
        })
    }

    const handleModifyAudio = (id, url) => {
        setAudio({
            id: id,
            type: 'AUDIO',
            url: url
        })
    }

    const handleModifyText = () => {
        handleTextType()
    }
    
    const handleStopRecordingAudio = () => {
        if (audioRecorderRef.current) {
            audioRecorderRef.current.stop()
            setRecordingAudio(false)
            cancelAnimationFrame(animationRef.current)
            setElapsedTime(0)
            setAudioData(new Uint8Array(0))
        }
    }

    const toggleRecordingAudio = () => {
        if (recordingAudio) {
            handleStopRecordingAudio()
        } else {
            handleStartRecordingAudio()
        }
    }

    const handleCaptureText = (e) => {
        e.preventDefault()
        setTextContent(e.target.value)
        setPost(prev => ({
            ...prev,
            text: e.target.value
        }))
    }

    const clearPhoto = (id) => {
        setPhoto(null)
        setPost(prev => ({
            ...prev,
            media: prev.media.filter(mediaItem => mediaItem.id !== id)  // Remove media item by ID
        }))
    }
    const keepPhoto = () => {
        const foundMedia = post.media?.find(elem => elem.id === photo.id)
        if (foundMedia) {
            setPhoto(null)
        } else {
            setPost(prev => ({
                ...prev,
                media: [...prev.media, {
                    id: photo.id,
                    type: 'IMAGE',
                    url: photo.url
                }]
            }))
            setPhoto(null)
        }
        
    }
    const clearVideo = (id) => {
        setVideo(null)
        setPost(prev => ({
            ...prev,
            media: prev.media.filter(mediaItem => mediaItem.id !== id)  // Remove media item by ID
        }))
    }
    const keepVideo = () => {
        const foundMedia = post.media?.find(elem => elem.id === video.id)
        if (foundMedia) {
            setVideo(null)
        } else {
            setPost(prev => ({
                ...prev,
                media: [...prev.media, {
                    id: video.id,
                    type: 'VIDEO',
                    url: video.url
                }]
            }))
            setVideo(null)
        }
        
    }

    const clearAudio = (id) => {
        setAudio(null)
        setPost(prev => ({
            ...prev,
            media: prev.media.filter(mediaItem => mediaItem.id !== id)
        }))
    }

    const keepAudio = () => {
        const foundMedia = post.media?.find(elem => elem.id === audio.id)
        if (foundMedia) {
            setAudio(null)
        } else {
            setPost(prev => ({
                ...prev,
                media: [...prev.media, {
                    id: audio.id,
                    type: 'AUDIO',
                    url: audio.url
                }]
            }))
            setAudio(null)
        }
    }

    const handlePhotoType = () => {
        setContentType('IMAGE')
    }
    const handleVideoType = () => {
        setContentType('VIDEO')
    }
    const handleAudioType = () => {
        setContentType('AUDIO')
    }
    const handleTextType = () => {
        setContentType('TEXT')
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

    const handleIsPinned = () => {
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                isPinned: !prev.settings.isPinned,
            }
        }))
    }

    const updatePosts = () => {
        let currentDate = new Date()
        let newPostId
        const foundPost = fanclubs
          .map(fanclub => {
            if (fanclub.artistId === currentArtist.id) {
                newPostId = fanclub.posts.length + 1
              return fanclub.posts.find(post => post.mode === 'SKETCH')
            }
            return null
          })
          .find(post => post !== null)
    
        if (foundPost) {
          setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === currentArtist.id) {
                        const updatedPosts = fanclub.posts.map(p => {
                            if (p.id === foundPost.id) {
                                return {
                                    ...post,
                                    artistId: currentArtist.id,
                                    publisher: {
                                        ...post.publisher,
                                        id: currentArtist.id,
                                        type: 'ARTIST'
                                    },
                                    mode: 'SKETCH',
                                    createdAt: currentDate,
                                    settings: {
                                        ...post.settings,
                                    },
                                }
                            }
                            return post
                        })

                        return {
                            ...fanclub,
                            posts: updatedPosts, 
                        }
                    }
                    return fanclub
                })
            )
        } else {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === currentArtist.id) {        
                        return {
                            ...fanclub,
                            posts: [
                                ...fanclub.posts,
                                {
                                    ...post,
                                    id: newPostId,
                                    artistId: currentArtist.id,
                                    publisher: {
                                        ...post.publisher,
                                        id: currentArtist.id,
                                        type: 'ARTIST'
                                    },
                                    mode: 'SKETCH',
                                    createdAt: currentDate,
                                    settings: {
                                        ...post.settings,
                                    },
                                },
                            ],
                        }
                    }
                    return fanclub
                })
            )
        }

        navigate('/artist-app/content-creation/post-review', { state: { postId: newPostId } })
    }

    //FORMA D'ONDA DURANTE REC AUDIO
    useEffect(() => {
        if (!recordingAudio || audioData.length === 0) return
    
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
    
        const drawWaveformBars = () => {
            if (!context || !canvas) return
    
            // Pulisce il canvas
            context.clearRect(0, 0, canvas.width, canvas.height)
    
            // Calcola i dati smussati
            const smoothedData = audioData.map((value, i) => {
                const previous = i > 0 ? audioData[i - 1] : 0
                return (previous + value) / 1.5 // Media con il valore precedente
            })
    
            // Configura lo stile delle barre
            const barWidth = canvas.width / smoothedData.length
            const barColor = '#FFFFFF' // Colore delle barre
    
            for (let i = 0; i < smoothedData.length; i++) {
                // Calcola l'ampiezza della barra con effetto non lineare
                const amplitude = Math.pow(smoothedData[i] / 256, 2) // Più reattivo alle variazioni
                const barHeight = amplitude * canvas.height // Altezza proporzionale
                const x = i * barWidth // Posizione orizzontale
                const y = (canvas.height - barHeight) / 2 // Centra le barre verticalmente
    
                // Disegna ogni barretta
                context.fillStyle = barColor
                context.fillRect(x, y, barWidth * 0.2, barHeight) // Aggiungi spazi tra barre
            }
        }
    
        drawWaveformBars()
    }, [audioData])

    const deletePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.filter(elem => elem.mode === 'PUBLISHED')
                    }
                }
                
                return fanclub
            })
        )
    }  

    return (
        <>
        <div className='d-flex-column j-c-center outer'>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} transparent={true} forcedExitPath={'/artist-app/fanclub'} clear={deletePost}/>
            {error && <p className='pt-xs-topbar'>Error accessing the camera: {error}</p>}
            
            <div className='camera-frame-wrapper position-relative'>
                {!video && !photo && !audio &&
                    <div className='d-flex-column gap-0_5em position-absolute-y right-5 z-index-5'>
                        <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleTextAreaVisibility}>
                            <img className='avatar-32' src={IconText} />
                        </div>
                        <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleLinkAreaVisibility}>
                            <img className='avatar-32' src={IconLink} />
                        </div>
                        <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleSettingsAreaVisibility}>
                            <img className='avatar-32' src={IconSettings} />
                        </div>
                    </div>
                }

                {!photo && !video && !audio &&
                    <>
                        {contentType === 'IMAGE' || contentType === 'VIDEO' ?
                            <video className='border-radius-1 overflow-clip object-fit-cover' ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
                        : contentType === 'TEXT' &&
                            <textarea className='bg-dark-soft-2 white letter-spacing-1 border-radius-1 fsize-xs-8 f-w-600 h-100' placeholder='Scrivi qui...' value={post?.text} onChange={handleCaptureText}></textarea>
                        }
                    </>
                }

                {/* registrazione audio forma d'onda durante */}
                {recordingAudio ? 
                    <>
                        <div className='d-flex-column j-c-center align-items-center w-100 h-100'>
                            <canvas className='w-100' ref={canvasRef}></canvas>
                            <div className='d-flex-row align-items-center j-c-center gap-1em'>
                                <span className='fsize-xs-3 f-w-600'>
                                    {elapsedTime.hours}h
                                </span>
                                <span className='fsize-xs-3 f-w-600'>
                                    {elapsedTime.minutes}m
                                </span>
                                <span className='fsize-xs-3 f-w-600'>
                                    {elapsedTime.seconds}s
                                </span>
                            </div>
                        </div>
                    </>
                : !recordingAudio && contentType === 'AUDIO' && !audio && !video && !photo &&
                    <>
                        <div className='d-flex-column j-c-center align-items-center w-100 h-100'>
                            <h1 className='fsize-xs-3 f-w-600'>Avvia una registrazione</h1>
                            <img className='avatar-32 mt-xs-4' src={IconWaveform} alt="X" />
                        </div>
                    </>
                }

                {photo ?
                    <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                        <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearPhoto(photo.id)}>
                                <img className='avatar-32' src={IconExit} alt="X" />
                                <span>Elimina</span>
                            </div>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => keepPhoto(photo.id)}>
                                <img className='avatar-32' src={IconOk} alt="X" />
                                <span>Tieni</span>
                            </div>
                        </div>
                        <img className='border-radius-04 object-fit-cover w-100 h-100' src={photo?.url} />
                    </div>
                : video ?
                    <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                        <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearVideo(video.id)}>
                                <img className='avatar-32' src={IconExit} alt="X" />
                                <span>Elimina</span>
                            </div>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => keepVideo(video.id)}>
                                <img className='avatar-32' src={IconOk} alt="X" />
                                <span>Tieni</span>
                            </div>
                        </div>
                        <video className='border-radius-04 object-fit-cover w-100 h-100' src={video?.url} controls={false} autoPlay={true} playsInline loop={true} />
                    </div>
                : audio && 
                <div className='position-relative d-flex-row j-c-center align-items-center ' style={{ width: '100%', height: '100%' }}>
                    <AudioPost src={audio.url}/>
                    <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                        <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearAudio(audio.id)}>
                            <img className='avatar-32' src={IconExit} alt="X" />
                            <span>Elimina</span>
                        </div>
                        <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => keepAudio(audio.id)}>
                            <img className='avatar-32' src={IconOk} alt="X" />
                            <span>Tieni</span>
                        </div>
                    </div>
                    {/* <audio controls>
                        <source src={audio.url} type="audio/webm" />
                        Il tuo browser non supporta l'audio HTML5.
                    </audio> */}
                    
                </div>
                }

                <AppbarContentCreation
                    handleCapturePhoto={handleCapturePhoto}
                    toggleRecording={toggleRecording}
                    toggleRecordingAudio={toggleRecordingAudio}
                    recording={recording}
                    recordingAudio={recordingAudio}
                    contentType={contentType}
                    photo={photo}
                    video={video}
                    audio={audio}
                    textContent={textContent}
                    updatePosts={updatePosts}
                    handlePhotoType={handlePhotoType}
                    handleVideoType={handleVideoType}
                    handleAudioType={handleAudioType}
                    handleTextType={handleTextType}
                    facingMode={facingMode}
                    switchCamera={switchCamera}
                    handleFileChange={handleFileChange}
                />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

        </div>

        {!video && !photo && !audio &&
            <div className='media-creation-control-bar d-flex-row j-c-space-between align-items-center h-96px'>
                <Container style='d-flex-row j-c-space-between align-items-center gap-0_5em'>
                    {(post.media.length > 0 || post.text.length > 0 ) ?
                        <div className='d-flex-row align-items-center gap-0_25em overflow-x shrink-1'>
                            {post.media?.map(elem => {
                                return (
                                    <>
                                        {elem.type ==='IMAGE' &&
                                            <img className='border-radius-04 object-fit-cover avatar-60' key={elem.id} src={elem.url} onClick={() => handleModifyPhoto(elem.id, elem.url)} />
                                        }
                                        {elem.type ==='VIDEO' &&
                                            <video className='border-radius-04 object-fit-cover avatar-60' key={elem.id} src={elem.url} controls={false} autoPlay={true} playsInline loop={true} onClick={() => handleModifyVideo(elem.id, elem.url)}/>
                                        }
                                        {elem.type ==='AUDIO' &&
                                            <div className='border-radius-04 object-fit-cover avatar-60 bg-dark-soft d-flex-row j-c-center align-items-center' onClick={() => handleModifyAudio(elem.id, elem.url)}>
                                                <img className='avatar-20' src={IconPlay}/>
                                            </div>
                                        }
                                    </>
                                )
                            })}
                            {post.text.length > 0 &&
                                <div className='d-flex-row align-items-center j-c-center border-radius-04 object-fit-cover avatar-60 bg-dark-soft-2 grey-300 f-w-600'onClick={() => handleModifyText()}>Text</div>
                            }
                        </div>
                    :
                        <p>Aggiungi almeno un media o un testo stand-alone per procedere alla pubblicazione del post</p>
                    }
                    <Button
                        style={`${(post.media.length > 0 || post.text.length > 0 ) ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-2 f-w-600 border-radius-100 letter-spacing-1 no-shrink w-25`}
                        disabled={(post.media.length > 0 || post.text.length > 0 ) ? false : true}
                        onClick={updatePosts}
                        label={'Avanti →'}
                    ></Button>
                </Container>
            </div>
        }

        <TextAreaCaption
            showTextArea={showTextArea}
            caption={post?.caption}
            handleTextAreaVisibility={handleTextAreaVisibility}
            handleCaption={handleCaption}
        />

        <LinkArea
            showLinkArea={showLinkArea}
            handleLinkAreaVisibility={handleLinkAreaVisibility}
            handleLinkUrl={handleLinkUrl}
            handleLinkName={handleLinkName}
            url={post?.link.url}
            name={post?.link.name}
        />

        <SettingsArea
            showSettingsArea={showSettingsArea}
            handleSettingsAreaVisibility={handleSettingsAreaVisibility}
            handleIsPrivate={handleIsPrivate}
            isPrivate={post.settings.isPrivate}
            handleIsPinned={handleIsPinned}
            isPinned={post.settings.isPinned}
        />
        </>
    )
    }

    export default ContentCreationRoute