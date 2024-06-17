import { useLocation } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'

import Button from './button.component'

const AppbarContentCreation = ({ handleCapturePhoto, handleMouseDown, handleMouseUp, recording }) => {

    const location = useLocation()

    return (
        <ContainerDefault containerSpecificStyle='position-fixed bottom-0 mx-xs-auto z-index-4'>
          <Button
            style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1'
            onClick={handleCapturePhoto}
            label='Scatta foto'
          />

          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {recording ? 'Recording...' : 'Press and Hold to Record'}
          </button>
      </ContainerDefault>

    )
}

export default AppbarContentCreation