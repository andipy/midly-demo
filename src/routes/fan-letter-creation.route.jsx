import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import IconExit from '../images/icons/icon-exit.svg'

import IconWaveform from '../images/icons/icon-waveform.png'
import IconOk from '../images/icons/icon-ok.svg'

import AppbarContentCreation from '../components/appbar-content-creation.component.artist'

import AudioPost from '../components/audio-post.component'
import NavbarFanLetterCreation from '../components/navbar-fan-letter-creation.component'

const FanLetterCreationRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {  artist } = location.state || {}
    const {currentFan}= useContext(CurrentFanContext)
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

    console.log(artist)

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
            } else if ( file.type.startsWith('audio/') ) {
                setAudio({
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

    const clearPhoto = (id) => {
        setPhoto(null)
    }
    const clearVideo = (id) => {
        setVideo(null)
    }
    const clearAudio = (id) => {
        setAudio(null)
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
                                        : type === 'AUDIO' ? audio?.url 
                                        : null, 
                                    type: type === 'PHOTO' ? photo?.type 
                                        : type === 'VIDEO' ? video?.type 
                                        : type === 'AUDIO' ? audio?.type 
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
                {!photo && !video && !audio &&
                    <>
                        {contentType === 'IMAGE' || contentType === 'VIDEO' &&
                            <video className='overflow-clip object-fit-cover' ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
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
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => updatePosts('PHOTO')}>
                                <img className='avatar-32' src={IconOk} alt="X" />
                                <span>Tieni</span>
                            </div>
                        </div>
                        <img className='object-fit-cover w-100 h-100' src={photo?.url} />
                    </div>
                : video ?
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
                : audio && 
                <div className='position-relative d-flex-row j-c-center align-items-center ' style={{ width: '100%', height: '100%' }}>
                    <AudioPost src={audio.url}/>
                    <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                        <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearAudio(audio.id)}>
                            <img className='avatar-32' src={IconExit} alt="X" />
                            <span>Elimina</span>
                        </div>
                        <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => updatePosts('AUDIO')}>
                            <img className='avatar-32' src={IconOk} alt="X" />
                            <span>Tieni</span>
                        </div>
                    </div>
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
                    facingMode={facingMode}
                    switchCamera={switchCamera}
                    handleFileChange={handleFileChange}
                    textDefined={false}
                    audioDefined={false}
                />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

        </div>

        {!video && !photo && !audio &&
            <div className='media-creation-control-bar d-flex-row j-c-space-between align-items-center'>
            </div>
        }
    </>
  )
}

export default FanLetterCreationRoute