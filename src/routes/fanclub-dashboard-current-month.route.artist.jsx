import { useContext, useState, useEffect } from 'react'

import { CurrentArtistContext } from '../contexts/currentArtist.context'

import WidgetRevenue from '../components/widget-revenue.component.artist'
import WidgetSubscribers from '../components/widget-subscribers.component.artist'

const FanclubDashboardCurrentMonthRoute = () => {

    const { currentArtist } = useContext(CurrentArtistContext)
    const [currentMonth, setCurrentMonth] = useState(1)
    const [currentDay, setCurrentDay] = useState(0)
    const [subs, setSubs] = useState(0)

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
    <section className='d-flex-column gap-1em mt-xs-4'>
        <WidgetRevenue
            widgetLabel={`Guadagno 1 ${months[currentMonth]} - ${currentDay} ${months[currentMonth]}:`} widgetValue={currentArtist?.currentMonthRevenue}
        />
        
        <WidgetSubscribers
            widgetLabel={`Abbonamenti 1 ${months[currentMonth]} - ${currentDay} ${months[currentMonth]}:`} widgetValue={currentArtist?.currentMonthSubs}
        />
    </section>
  )
}

export default FanclubDashboardCurrentMonthRoute