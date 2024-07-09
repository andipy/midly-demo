import ContainerDefault from '../layout/container-default.layout'

import Button from '../components/button.component'
import SimpleSpinnerLoader from '../components/simple-spinner-loader.component'

const LoadersRoute = () => {
    return (
        <ContainerDefault>
            <Button style={'d-flex-row align-items-center j-c-center gap-0_5em bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 pt-xs-3 pb-xs-3'} label={'Sto entrando...'}>
                <SimpleSpinnerLoader place={'loader-button'} />
            </Button>
        </ContainerDefault>

    )
}

export default LoadersRoute