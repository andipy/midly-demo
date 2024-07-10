import { useEffect, useState } from "react"
import SimpleSpinnerLoader from "./simple-spinner-loader.component"

const WidgetMetric = ({ metric }) => {

  const [isLoading, setIsLoading] = useState(true)  
  const { label, value, dailyIncrement } = metric

    const formatNumber = (num) => {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
        } else {
          return num.toString()
        }
    }

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }, [])

    return (
        <div className='w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4'>
            <p className='fsize-xs-1 grey-300 letter-spacing-3'>{label}</p>
            <div className='d-flex-row align-items-center gap-1em mt-xs-6'>
              {isLoading ?
                <SimpleSpinnerLoader size={'loader-small'} />
              :
                <h4 className='fsize-xs-8 letter-spacing-2 f-w-500'>{formatNumber(value)}</h4>
              }
              {!isLoading &&
                <p className={`fsize-xs-2 f-w-200 grey-200 letter-spacing-1 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 border-radius-02 ${dailyIncrement >= 0 ? 'bg-green-900' : 'bg-red-900'}`}><span className={`${dailyIncrement >= 0 ? 'green-400' : 'red-400'} f-w-400`}>{dailyIncrement >= 0 && '+'}{dailyIncrement}%</span> Rispetto a ieri</p>
              }
            </div>
            
        </div>
    )
}

export default WidgetMetric