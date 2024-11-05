
const  WidgetMetricFlashLeaderboard = ({ widgetLabel, widgetValue } ) => {

    const formatNumber = (value) => {
        if (value < 1000) {
            if (Number.isInteger(value)) {
                return value
            } else {
                return value.toFixed(1)
            }
        } else if (value > 1000000) {
            if (Number.isInteger(value / 1000)) {
                return value/1000000 + 'M'
            } else {
                return (value/1000000).toFixed(1) + 'M'
            }
        } else {
            if (Number.isInteger(value / 1000)) {
                return value/1000 + 'K'
            } else {
                return (value/1000).toFixed(1) + 'K'
            }
        }
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