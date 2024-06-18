import React, { useRef, useEffect, useState } from 'react'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'

import IconExit from '../images/icons/icon-exit.svg'
import NavbarMultistep from '../components/navbar-multistep.component'
import AppbarContentCreation from '../components/appbar-content-creation.component.artist'


const CameraViewport = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [error, setError] = useState(null)
  const [recording, setRecording] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [mediaType, setMediaType] = useState('PHOTO')

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
    };
    mediaRecorderRef.current.start()
    setRecording(true)
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
  };

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

  return (
    <>
      <NavbarMultistep stepNumber={1} />
      {error && <p>Error accessing the camera: {error}</p>}
      <FullPageCenter>
        <ContainerDefault containerSpecificStyle={'video-frame-post-creation position-relative'}>
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
            <div className='position-relative video-frame-post-creation'>
              <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-0 avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={clearPhoto}>
                <img className='avatar-32' src={IconExit} alt="X" />
              </div>
              <img className='border-radius-04 object-fit-cover w-100 h-100' src={photoUrl} />
            </div>
            : videoUrl &&
            <div className='position-relative video-frame-post-creation'>
              <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-0 avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={clearVideo}>
                <img className='avatar-32' src={IconExit} alt="X" />
              </div>
              <video className='border-radius-04 object-fit-cover w-100 h-100' src={videoUrl} controls />
            </div>
          }
        </ContainerDefault>
      </FullPageCenter>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <AppbarContentCreation
        handleCapturePhoto={handleCapturePhoto}
        toggleRecording={toggleRecording}
        recording={recording}
        mediaType={mediaType}
        photoUrl={photoUrl}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default CameraViewport;