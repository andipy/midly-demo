import { useContext, useState, useEffect } from 'react'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import WidgetEarningsSub from '../components/widget-earnings-sub.component'
import WidgetEarningsRevenueBill from '../components/widget-earnings-revenue-bill.component'

function EarningsLastMonth() {
    const { currentArtist } = useContext(CurrentArtistContext)
    const [currentMonth, setCurrentMonth] = useState(1)
    const [ subs, setSubs] = useState(0)

    const months = {
        1: 'Gennaio',
        2: 'Febbraio',
        3: 'Marzo',
        4: 'Aprile',
        5: 'Maggio',
        6: 'Giugno',
        7: 'Luglio',
        8: 'Agosto',
        9: 'Settembre',
        10: 'Ottobre',
        11: 'Novembre',
        12: 'Dicembre',
    }

    useEffect(() => {
        const today = new Date()
        const month = today.getMonth() + 1
        setCurrentMonth(month)

        const totalSubs = currentArtist.subsOverTime[0].dataSet
        .filter(({ date }) => {
            const dataDate = new Date(date)
            return dataDate.getMonth() + 1 <= month
        })
        .reduce((total, { value }) => total + value, 0)

        setSubs(totalSubs)

    }, [currentArtist])
  return (
    <>
        <section id='metrics' className='mt-xs-2 mr-xs-auto'>
            <div className='mt-xs-4'>
                        <div className='d-flex-column j-c-start align-items-start'>
                            <WidgetEarningsRevenueBill widgetLabel={`Il tuo guadagno di ${months[currentMonth-1]}:`} widgetValue={currentArtist?.lastMonthRevenue}/>
                            <WidgetEarningsSub widgetLabel={`Abbonamenti fino a  ${months[currentMonth-1]}:`} widgetValue={subs}/> 
                        </div>
                    </div>
                </section>
            </>
  )
}

export default EarningsLastMonth