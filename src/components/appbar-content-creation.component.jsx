import Container from '../layout/container.layout'
import IconMedia from '../images/icons/icon-picture.svg'
import IconFlip from '../images/icons/icon-flip.svg'

const AppbarContentCreation = ({ handleCapturePhoto, toggleRecording, recording, contentType, photo, video, handlePhotoType, handleVideoType, switchCamera, facingMode, handleFileChange }) => {

    return (
        <section className='app-bar-content-creation-area d-flex-column j-c-center align-items-center gap-0_5em'>
            <Container style={'d-flex-row j-c-space-between align-items-center z-index-999'}>
                {!photo && !video && contentType !== 'TEXT' &&
                    <section className='d-flex-row j-c-center grow-1'>
                        <div className='d-flex-column align-items-center gap-0_25em'>
                            <div className='avatar-32 no-shrink position-relative'>
                                <img className='avatar-32 position-absolute-x-y' src={IconMedia} />
                                <input type='file' className='w-100 h-100 grey-300 w-auto opacity-0 z-index-5' onChange={handleFileChange} />
                            </div>
                            <span className='fsize-xs-0'>GALLERY</span>
                        </div>
                    </section>
                }

                {!photo && !video &&
                    <>
                        {contentType === 'IMAGE' ?
                            <div className='d-flex-row align-items-center j-c-center gap-1em'>
                                <div className='position-relative border-white avatar-60 border-radius-100 fsize-xs-3 f-w-600 dark-900 no-shrink' onClick={handleCapturePhoto}>
                                    <div className='position-absolute-x-y bg-white avatar-48 border-radius-100'></div>
                                </div>
                            </div>
                        : contentType === 'VIDEO' ?
                            <div className='d-flex-row align-items-center j-c-center gap-1em'>
                                <div
                                    className='position-relative border-white avatar-60 border-radius-100 fsize-xs-3 f-w-600 dark-900 letter-spacing-1'
                                    onClick={toggleRecording}
                                >
                                    <div className={`position-absolute-x-y bg-red-300 ${recording ? 'avatar-24 border-radius-04' : 'avatar-48 border-radius-100'}`}></div>
                                </div>
                            </div>
                        : null
                        }
                    </>
                }

                {!photo && !video &&
                    <section className='d-flex-row j-c-end grow-1'>
                        <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100' onClick={switchCamera}>
                            <img className={`avatar-32 icon-flip-camera ${facingMode == 'user' ? 'icon-flip-camera-user' : facingMode === 'environment' && 'icon-flip-camera-environment'}`} src={IconFlip} />
                        </div>
                    </section>
                }
            </Container>

            {!photo && !video &&
                <div className='d-flex-row align-items-center j-c-center gap-0_25em mb-xs-2'>
                    <span className={`pt-xs-3 pb-xs-3 pl-xs-4 pr-xs-4 border-radius-100 bg-dark-soft-transp75 fsize-xs-2 letter-spacing-1 ${contentType === 'IMAGE' ? 'white' : 'grey-400'}`} onClick={handlePhotoType}>FOTO</span>
                    <span className={`pt-xs-3 pb-xs-3 pl-xs-4 pr-xs-4 border-radius-100 bg-dark-soft-transp75 fsize-xs-2 letter-spacing-1 ${contentType === 'VIDEO' ? 'white' : 'grey-400'}`} onClick={handleVideoType}>VIDEO</span>
                </div>
            }
        </section>
    )
}

export default AppbarContentCreation