import IconCopyLime from '../images/icons/icon-copy-lime.svg'

const WidgetPastRevenue = ({ widgetValue, prevMonth, triggerSnackbar }) => {
	
	const formatNumber = (value) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'").replace('.', ',')
	}

	return (
		<div className='d-flex-column j-c-center gap-0_5em w-100 bg-dark-gradient border-radius-08 pl-xs-6 pr-xs-6 pt-xs-6 pb-xs-6'>

			<p className='fsize-xs-5 f-w-600 grey-100 line-height-140'>Per <span className='lime-400'>{prevMonth}</span>, invia una fattura con questo importo a MIDLY:</p>

			<div className='d-flex-row align-items-center j-c-space-between'>
				<h4 className='fsize-xs-8 letter-spacing-2 f-w-500 lime-400'>€{formatNumber(widgetValue)}</h4>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04'>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} alt='points' onClick={() => triggerSnackbar(`Importo copiato: € ${formatNumber(widgetValue)}`)} />
				</div>
			</div>

			<hr className='mt-xs-4 mb-xs-4' />
			
			<div className="d-flex-row mt-xs-2 j-c-space-between align-items-center">
				<p className='fsize-xs-1 grey-200 letter-spacing-2'>MIDLY S.R.L</p>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04' onClick={() => triggerSnackbar(`Azienda copiata: MIDLY S.R.L`)}>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} />
				</div>
			</div>

			<div className="d-flex-row mt-xs-2 j-c-space-between align-items-center">
				<p className='fsize-xs-1 grey-200 letter-spacing-2'>P.IVA: IT11161730962</p>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04' onClick={() => triggerSnackbar(`P.IVA copiata: IT11161730962`)}>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} />
				</div>
			</div>

			<div className='d-flex-row mt-xs-2 j-c-space-between align-items-center'>
				<p className='fsize-xs-1 grey-200 letter-spacing-2'>C.F: 11161730962</p>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04' onClick={() => triggerSnackbar(`C.F copiato: 11161730962`)}>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} />
				</div>
			</div>

			<div className='d-flex-row mt-xs-2 j-c-space-between align-items-center'>
				<p className='fsize-xs-1 grey-200 letter-spacing-2'>Via umberto maddalena, 20 20824 - LAZZATE (MB) - IT'</p>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04' onClick={() => triggerSnackbar(`Indirizzo copiato`)}>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} />
				</div>
			</div>

			<div className='d-flex-row mt-xs-2 j-c-space-between align-items-center'>
				<p className='fsize-xs-1 grey-200 letter-spacing-2'>Codice destinatario: W7YVJK9</p>
				<div className='d-flex-row align-items-center j-c-center avatar-32 bg-acid-lime-op-10 border-radius-04' onClick={() => triggerSnackbar(`Codice destinatario copiato: W7YVJK9`)}>
					<img className='avatar-24 ml-xs-2' src={IconCopyLime} />
				</div>
			</div>
		</div>
	)
}

export default WidgetPastRevenue