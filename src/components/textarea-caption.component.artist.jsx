import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'


const TextAreaCaption = ({ showTextArea, handleTextAreaVisibility, handleCaption }) => {
    return (
        <div className={`position-fixed bottom-hidden bg-dark w-100 full-screen-modal ${showTextArea ? 'slide-up' : 'slide-down'}`}>
            <ContainerDefault containerSpecificStyle={'pt-xs-4 pb-xs-4'}>
                <textarea className='bg-dark-soft white letter-spacing-1 border-radius-04' placeholder='Scrivi qui la caption...' rows='6' onChange={handleCaption}></textarea>
                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4' label='Fatto' onClick={handleTextAreaVisibility} />
            </ContainerDefault>
        </div>
    )
}

export default TextAreaCaption