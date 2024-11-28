import { useState } from 'react'

import IconCopyLime from "../images/icons/icon-copy-lime.svg"

import Snackbar from '../components/snackbar.component';


function WidgetEarningsRevenueBill({ widgetLabel, widgetValue }) {
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'").replace('.', ',')
    }
    
    const [triggered, setTriggered] = useState(false);
    const triggerSnackbar = () => {
        setTriggered(true);
        setTimeout(() => {
            setTriggered(false)
        }, 2000)
    }
  return (
    <div className='d-flex-column j-c-center gap-0_5em w-100 bg-dark-gradient border-radius-08 pl-xs-8 pr-xs-8 pt-xs-6 pb-xs-6 mt-xs-4'>
        <Snackbar message={'Copied to clipboard'} triggered={triggered} />
        <p className='fsize-xs-1 grey-300 letter-spacing-2'>{widgetLabel.toUpperCase()}</p>
        <div className='d-flex-row align-items-center j-c-space-between'>
            <h4 className='fsize-xs-8 letter-spacing-2 f-w-500 lime-400'>€{formatNumber(widgetValue)}</h4>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar}/>
        </div>
        <h4 className="fsize-xs-3 f-w-500 grey-200 mt-xs-4">
            Invia una fattura con l'importo qui sopra a Midly per riscuotere il tuo guadagno:
        </h4>
        <div className="d-flex-row mt-xs-4 j-c-space-between align-items-center">
            <p className='fsize-xs-1 grey-300 letter-spacing-2'>{'MIDLY S.R.L'}</p>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar}/>
        </div>
        <div className="d-flex-row mt-xs-4 j-c-space-between align-items-center">
            <p className='fsize-xs-1 grey-300 letter-spacing-2'>{'P.IVA: IT11161730962'}</p>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar} />
        </div>
        <div className="d-flex-row mt-xs-4 j-c-space-between align-items-center">
            <p className='fsize-xs-1 grey-300 letter-spacing-2'>{'C.F: 11161730962'}</p>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar}/>
        </div>
        <div className="d-flex-row mt-xs-4 j-c-space-between align-items-center">
            <p className='fsize-xs-1 grey-300 letter-spacing-2'>{'Via umberto maddalena, 20 20824 - LAZZATE (MB) - IT'}</p>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar}/>
        </div>
        <div className="d-flex-row mt-xs-4 j-c-space-between align-items-center">
            <p className='fsize-xs-1 grey-300 letter-spacing-2'>{'Codice destinatario: W7YVJK9'}</p>
            <img className='avatar-32 ml-xs-2' src={IconCopyLime} alt='points' onClick={triggerSnackbar}/>
        </div>
    </div>
  )
}

export default WidgetEarningsRevenueBill