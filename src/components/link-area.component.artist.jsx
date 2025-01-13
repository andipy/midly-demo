import Container from '../layout/container.layout'
import Button from './button.component'


const LinkArea = ({ showLinkArea, handleLinkAreaVisibility, handleLinkUrl, handleLinkName, url, name }) => {
    return (
        <div className={`position-fixed bottom-hidden bg-dark-soft w-100 border-radius-top-08 z-index-1100 ${showLinkArea ? 'slide-up' : 'slide-down'}`}>
            <Container style={'pt-xs-4 pb-xs-4'}>
                <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6 font-heading' htmlFor='link-url'>LINK</label>
                <input id='link-url' className='bg-dark white letter-spacing-1 border-radius-04 mb-xs-10' placeholder='Incolla qui il link' value={url} onChange={handleLinkUrl} />

                <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6 font-heading' htmlFor='link-name'>NOME DEL LINK</label>
                <input id='link-name' className='bg-dark white letter-spacing-1 border-radius-04' placeholder='Come vuoi che i fan lo leggano' value={name} onChange={handleLinkName} />
                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-8' label='Fatto' onClick={handleLinkAreaVisibility} />
            </Container>
        </div>
    )
}

export default LinkArea