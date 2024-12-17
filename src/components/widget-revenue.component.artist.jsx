const WidgetCurrentRevenue = ({ widgetLabel, widgetValue }) => {
	
	const formatNumber = (value) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'").replace('.', ',')
	}

	return (
		<div className='d-flex-column j-c-center gap-0_5em w-100 bg-dark-gradient border-radius-08 pl-xs-8 pr-xs-8 pt-xs-6 pb-xs-6'>
			<p className='fsize-xs-1 grey-300 letter-spacing-2'>{widgetLabel.toUpperCase()}</p>
			<div className='d-flex-row align-items-center'>
				<h4 className='fsize-xs-8 letter-spacing-2 f-w-500'>€{formatNumber(widgetValue)}</h4>
			</div>
		</div>
	)
}

export default WidgetCurrentRevenue