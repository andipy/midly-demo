import { useLocation } from 'react-router-dom'

import IconMedia from '../images/icons/icon-picture.svg'
import ContainerDefault from '../layout/container-default.layout'
import Button from '../components/button.component'

const AppbarContentCreation = ({ handleCapturePhoto, toggleRecording, recording, mediaType, photoUrl, videoUrl, updatePosts }) => {

    const location = useLocation()

    return (
      <div className='app-bar-content-creation-area d-flex-row j-c-center border-top-dark-01 z-index-max appbar-creation'>
        <ContainerDefault containerSpecificStyle='d-flex-row j-c-center align-items-center position-relative'>
          {videoUrl || photoUrl ?
            <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Pubblica' onClick={updatePosts} />
          :
            <>
              {mediaType === 'PHOTO' ?
                <div className='d-flex-row align-items-center j-c-center gap-1em'>
                  <div className='position-relative border-white avatar-48 border-radius-100 fsize-xs-3 f-w-600 dark-900 no-shrink' onClick={handleCapturePhoto}>
                    <div className='position-absolute-x-y bg-white avatar-40 border-radius-100'></div>
                  </div>
                  <div className='avatar-48 no-shrink border-dark border-radius-08 position-relative'>
                    <img className='position-absolute-x-y' src={IconMedia} />
                    <input type='file' className='w-100 h-100 grey-300 w-auto opacity-0' />
                  </div>
                </div>
              : mediaType === 'VIDEO' &&
                <div className='d-flex-row align-items-center j-c-center gap-1em'>
                  <div
                    className='position-relative border-white avatar-48 border-radius-100 fsize-xs-3 f-w-600 dark-900 letter-spacing-1'
                    onClick={toggleRecording}
                  >
                    <div className={`position-absolute-x-y bg-red-300 ${recording ? 'avatar-24 border-radius-04' : 'avatar-40 border-radius-100'}`}></div>
                  </div>
                  <div className='avatar-48 no-shrink border-dark border-radius-08 position-relative'>
                    <img className='position-absolute-x-y' src={IconMedia} />
                    <input type='file' className='w-100 h-100 grey-300 w-auto opacity-0' />
                  </div>
                </div>
              }
            </>
          }
      </ContainerDefault>
      </div>
    )
}

export default AppbarContentCreation