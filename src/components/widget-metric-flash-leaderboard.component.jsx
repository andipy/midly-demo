
const  WidgetMetricFlashLeaderboard = ({ widgetLabel, widgetValue } ) => {


    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    }

    return (
        <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
            <p className="fsize-xs-1 grey-300 letter-spacing-3">{widgetLabel}</p>
            <div className="d-flex-row align-items-center gap-1em mt-xs-6">
                <h4 className="fsize-xs-8 letter-spacing-2 f-w-500">{formatNumber(widgetValue)}</h4>
            </div>
        </div>
    )
}

export default WidgetMetricFlashLeaderboard