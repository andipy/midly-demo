import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import SimpleSpinnerLoader from '../components/simple-spinner-loader.component'

const LoadingRoute = () => {

    return (
        <FullPageCenter>
            <SimpleSpinnerLoader size={'loader-medium'} />
            <p className='mt-xs-4 lime-400'>Attendi, sto tornando su MIDLY...</p>
        </FullPageCenter>

    )
}

export default LoadingRoute