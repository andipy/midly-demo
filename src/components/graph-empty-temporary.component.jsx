import IconMetrics from '../images/icons/icon-metrics.svg'

const GraphEmpty = ({ label }) => {
    return (
        <div className='w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4'>
            <p className='fsize-xs-1 grey-300 letter-spacing-3 mb-xs-4'>{label}</p>

            <div className='d-flex-row align-items-center gap-1em mb-xs-8'>
                <div className='d-flex-row align-items-center'>
                    <div className='avatar-16 bg-acid-lime border-radius-02 no-shrink'></div>
                    <span className='fsize-xs-1 grey-300 ml-xs-2 no-shrink'>Mese corrente</span>
                </div>

                <div className='d-flex-row align-items-center'>
                    <div className='avatar-16 bg-blue-400 border-radius-02 no-shrink'></div>
                    <span className='fsize-xs-1 grey-300 ml-xs-2 no-shrink'>Mese precedente</span>
                </div>
            </div>

            <div className='d-flex-column align-items-center j-c-center pt-xs-8 pb-xs-8'>
                <img className='avatar-48' src={IconMetrics} />

                <p className='fsize-xs-1 f-w-200 t-align-center grey-300 w-90'>Non ci sono abbastanza dati per costrutire il grafico di comparazione tra il mese precedente e quello in corso.</p>
            </div>
        </div>
    )
}

export default GraphEmpty