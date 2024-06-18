import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'


const LinkArea = ({ showLinkArea, handleLinkAreaVisibility }) => {
    return (
        <div className={`position-fixed bottom-hidden bg-dark w-100 full-screen-modal ${showLinkArea ? 'slide-up' : 'slide-down'}`}>
            <ContainerDefault containerSpecificStyle={'pt-xs-4 pb-xs-4'}>
                <label class='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6 font-heading' for='link-url'>LINK</label>
                <input id='link-url' className='bg-dark-soft white letter-spacing-1 border-radius-04 mb-xs-10' placeholder='Incolla qui il link' />

                <label class='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6 font-heading' for='link-name'>NOME DEL LINK</label>
                <input id='link-name' className='bg-dark-soft white letter-spacing-1 border-radius-04' placeholder='Come vuoi che i fan lo leggano' rows='6' />
                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-8' label='Fatto' onClick={handleLinkAreaVisibility} />
            </ContainerDefault>
        </div>
    )
}

export default LinkArea