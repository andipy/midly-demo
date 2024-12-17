import { useContext, useState, useEffect } from 'react'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import WidgetSubscribers from '../components/widget-subscribers.component.artist'
import WidgetPastRevenue from '../components/widget-past-revenue.component.artist'
import Snackbar from '../components/snackbar.component'

const FanclubDashboardLastMonthRoute = () => {

	const { currentArtist } = useContext(CurrentArtistContext)
	const [currentMonth, setCurrentMonth] = useState(1)
	const [subs, setSubs] = useState(0)

	const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}

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
			<main className='d-flex-column gap-1em mt-xs-4'>
				<WidgetPastRevenue
					widgetValue={currentArtist?.lastMonthRevenue}
					triggerSnackbar={triggerSnackbar}
					prevMonth={months[(currentMonth - 1)]}
				/>
				
				<WidgetSubscribers
					widgetLabel={`Fan abbonati fino a  ${months[currentMonth - 1]}:`}
					widgetValue={subs}
				/>
			</main>

			<Snackbar message={messageSnackbar} triggered={triggered} />
		</>
	)
}

export default FanclubDashboardLastMonthRoute