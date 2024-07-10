import ContainerDefault from '../layout/container-default.layout'

import Button from '../components/button.component'
import SimpleSpinnerLoader from '../components/simple-spinner-loader.component'
import GraphEmpty from '../components/graph-empty-temporary.component'

const LoadersRoute = () => {
    return (
        <ContainerDefault>
            <h3 className='mt-xs-10 fsize-xs-4'>Here a loading button for visual comparison</h3>
            <Button style={'d-flex-row align-items-center j-c-center gap-0_5em bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1'} label={'Sto entrando...'}>
                <SimpleSpinnerLoader place={'loader-button'} />
            </Button>

            <h3 className='mt-xs-10 fsize-xs-4'>Here a non-loading button for visual comparison</h3>
            <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Next' />

            <h3 className='mt-xs-10 fsize-xs-4'>Placeholder empty graph to keep until around 17th of july 2024</h3>
            <GraphEmpty label={'COMPARAZIONE: STREAM'} />
            <GraphEmpty label={'COMPARAZIONE: FAN IN CLASSIFICA'} />
        </ContainerDefault>

    )
}

export default LoadersRoute