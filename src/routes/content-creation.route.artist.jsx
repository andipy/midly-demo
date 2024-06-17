import React, { useRef, useEffect, useState } from 'react'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'

import NavbarMultistep from '../components/navbar-multistep.component'
import Button from '../components/button.component'
import AppbarContentCreation from '../components/appbar-content-creation.component.artist'

const CameraViewport = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [error, setError] = useState(null)
  const [recording, setRecording] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
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
    }
    mediaRecorderRef.current.start()
    setRecording(true)
  }
  const handleStopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
  }
  const handleMouseDown = () => {
    handleStartRecording()
  }
  const handleMouseUp = () => {
    handleStopRecording()
  }

  const clearPhoto = () => {
    setPhotoUrl(null)
  }
  const clearVideo = () => {
    setVideoUrl(null)
  }

  return (
    <>
      <NavbarMultistep stepNumber={1} />
      {error && <p>Error accessing the camera: {error}</p>}
      <FullPageCenter>
        <ContainerDefault containerSpecificStyle={'video-frame-post-creation'}>
          {!photoUrl && !videoUrl &&
            <video className='border-radius-08 overflow-clip object-fit-cover' ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} />
          }
          
          {photoUrl ?
            <div className='position-relative video-frame-post-creation'>
              <img className='position-absolute z-index-3 right-0 top-0' src="" alt="X" onClick={clearPhoto} />
              <img className='border-radius-08 object-fit-cover w-100 h-100' src={photoUrl} alt="Captured" />
            </div>
          : videoUrl &&
            <div className='position-relative video-frame-post-creation'>
              <img className='position-absolute z-index-3 right-0 top-0' src="" alt="X" onClick={clearVideo} />
              <video className='border-radius-08 object-fit-cover w-100 h-100' src={videoUrl} controls />
            </div>
          }
        </ContainerDefault>
      </FullPageCenter>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <AppbarContentCreation
        handleCapturePhoto={handleCapturePhoto}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        recording={recording}
      />
    </>
  )
}

export default CameraViewport
