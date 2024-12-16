import Container from '../layout/container.layout'
import Button from './button.component'


const TextAreaCaption = ({ showTextArea, handleTextAreaVisibility, handleCaption }) => {
    return (
        <div className={`position-fixed bottom-hidden bg-dark-soft w-100 border-radius-top-08 z-index-1100 ${showTextArea ? 'slide-up' : 'slide-down'}`}>
            <Container style={'pt-xs-4 pb-xs-4'}>
                <textarea className='bg-dark white letter-spacing-1 border-radius-04' placeholder='Scrivi qui la caption...' rows='6' onChange={handleCaption}></textarea>
                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4' label='Fatto' onClick={handleTextAreaVisibility} />
            </Container>
        </div>
    )
}

export default TextAreaCaption