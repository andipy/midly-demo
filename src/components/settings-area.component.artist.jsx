import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'


const SettingsArea = ({ showSettingsArea, handleSettingsAreaVisibility, handleIsPrivate, isPrivate }) => {
    return (
        <div className={`position-fixed bottom-hidden bg-dark-soft w-100 full-screen-modal ${showSettingsArea ? 'slide-up' : 'slide-down'}`}>
            <ContainerDefault containerSpecificStyle={'pt-xs-4 pb-xs-4'}>
                <div className='d-flex-row align-items-center j-c-space-between mb-xs-4 mt-xs-2'>
                    <p className='fsize-xs-4'>Contenuto a pagamento</p>
                    <div className={`toggle-area ${isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={handleIsPrivate}>
                        <div className={`toggle-dot ${isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>
                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4' label='Fatto' onClick={handleSettingsAreaVisibility} />
            </ContainerDefault>
        </div>
    )
}

export default SettingsArea