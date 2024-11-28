import { useContext, useState, useEffect } from 'react'

import WidgetEarningsRevenue from '../components/widget-earnings-revenue.component'
import WidgetEarningsSub from '../components/widget-earnings-sub.component'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
function EarningsCurrentMonth() {

    const { currentArtist } = useContext(CurrentArtistContext)
    const [currentMonth, setCurrentMonth] = useState(1)
    const [ currentDay, setCurrentDay ] = useState(0)
    const [ subs, setSubs] = useState(0)

    const months = {
        1: 'Genn',
        2: 'Febb',
        3: 'Mar',
        4: 'Apr',
        5: 'Mag',
        6: 'Giu',
        7: 'Lug',
        8: 'Ago',
        9: 'Sett',
        10: 'Ott',
        11: 'Nov',
        12: 'Dic',
    }

    useEffect(() => {
        const today = new Date()
        const month = today.getMonth() + 1
        setCurrentMonth(month)
        setCurrentDay(today.getDate())

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
                            <WidgetEarningsRevenue widgetLabel={`Guadagno 1 ${months[currentMonth]} - ${currentDay} ${months[currentMonth]}:`} widgetValue={currentArtist?.currentMonthRevenue}/>
                            <WidgetEarningsSub widgetLabel={`Abbonamenti 1 ${months[currentMonth]} - ${currentDay} ${months[currentMonth]}:`} widgetValue={currentArtist?.currentMonthSubs}/> 
                        </div>
                    </div>
                </section>
    </>
  )
}

export default EarningsCurrentMonth