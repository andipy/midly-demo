import React, { useRef, useEffect, useState } from 'react'

import NavbarMultistep from '../components/navbar-multistep.component'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'

const ContentCreation = () => {
  const videoRef = useRef(null)
  const [error, setError] = useState(null)

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
  }, [])

  return (
    <div>
      <NavbarMultistep stepNumber={1} />
      {error && <p>Error accessing the camera: {error}</p>}
      <FullPageCenter>
        <ContainerDefault>
          <video className='border-radius-08 w-100 h-100' ref={videoRef} autoPlay />
        </ContainerDefault> 
      </FullPageCenter>
    </div>
  )
}

export default ContentCreation