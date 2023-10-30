import IconSuccessStandard from '../images/icons/icon-success-standard.svg'

const Snackbar = ({message, triggered}) => {
    return (
        <div className={`container position-fixed z-index-max snackbar ${triggered ? 'snackbar-appear-animation' : ''}`}>
            <div className="d-flex-row align-items-center pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4 bg-green-300 border-radius-08">
                <img className="mr-xs-4" src={IconSuccessStandard} alt="YE!" />
                <p className="fsize-xs-1 f-w-400 white letter-spacing-1 line-height-sm mr-xs-2">{message}</p>
            </div>
        </div>
    )
}

export default Snackbar;