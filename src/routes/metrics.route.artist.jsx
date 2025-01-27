import Container from '../layout/container.layout'

import Navbar from '../components/navbar.component.artist'
import Appbar from '../components/appbar.component.artist'
import WidgetMetric from '../components/widget-metric.component.artist'
import Graph from '../components/graph.component.artist'


const MetricsRoute = () => {

    const getCurrentMonthAndYear = () => {
        const today = new Date()
        const month = today.toLocaleString('default', { month: 'long' })
        const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1)
        const year = today.getFullYear()
        return formattedMonth + ' ' + year
    }

    const metrics = [
        {
            id: 1,
            label: 'FAN IN CLASSIFICA',
            value: 7681,
            dailyIncrement: 3.6 
        },{
            id: 2,
            label: 'STREAM GENERATI DAI FAN',
            value: 126808,
            dailyIncrement: 2.3 
        },{
            id: 3,
            label: 'ASCOLTI MEDI PER FAN',
            value: 16.5,
            dailyIncrement: 1.4
        }
    ]

    const graphs = [
        {
            id: 'graph-1',
            label: 'COMPARAZIONE: STREAM',
            dataset: [
                { date: new Date('2024-07-01'), value: 0 },
                { date: new Date('2024-07-02'), value: 67 },
                { date: new Date('2024-07-03'), value: 133 },
                { date: new Date('2024-07-04'), value: 167 },
                { date: new Date('2024-07-05'), value: 234 },
                { date: new Date('2024-07-06'), value: 311 },
                { date: new Date('2024-07-07'), value: 560 },
                { date: new Date('2024-07-08'), value: 666 },
                { date: new Date('2024-07-09'), value: 723 },
                { date: new Date('2024-07-10'), value: 899 },
                { date: new Date('2024-07-11'), value: 1101 },
                { date: new Date('2024-07-12'), value: 1399 },
                { date: new Date('2024-07-13'), value: 1601 },
                { date: new Date('2024-07-14'), value: 2007 },
                { date: new Date('2024-07-15'), value: 2345 },
                { date: new Date('2024-07-16'), value: 2674 },
                { date: new Date('2024-07-17'), value: 2999 },
                { date: new Date('2024-07-18'), value: 3417 },
                { date: new Date('2024-07-19'), value: 3765 },
                { date: new Date('2024-07-20'), value: 3998 },
                { date: new Date('2024-07-21'), value: 4465 },
                { date: new Date('2024-07-22'), value: 4678 },
                { date: new Date('2024-07-23'), value: 4886 },
                { date: new Date('2024-07-24'), value: 5012 },
                { date: new Date('2024-07-25'), value: 5678 },
                { date: new Date('2024-07-26'), value: 5777 },
                { date: new Date('2024-07-27'), value: 5992 },
                { date: new Date('2024-07-28'), value: 6233 },
                { date: new Date('2024-07-29'), value: 6465 },
                { date: new Date('2024-07-30'), value: 6714 },
                { date: new Date('2024-07-31'), value: 6999 },
            ],
            dataset2: [
                { date: new Date('2024-07-01'), value: 0 },
                { date: new Date('2024-07-02'), value: 211 },
                { date: new Date('2024-07-03'), value: 287 },
                { date: new Date('2024-07-04'), value: 344 },
                { date: new Date('2024-07-05'), value: 411 },
                { date: new Date('2024-07-06'), value: 520 },
                { date: new Date('2024-07-07'), value: 554 },
                { date: new Date('2024-07-08'), value: 698 },
                { date: new Date('2024-07-09'), value: 912 },
                { date: new Date('2024-07-10'), value: 994 },
                { date: new Date('2024-07-11'), value: 1381 },
                { date: new Date('2024-07-12'), value: 1699 },
                { date: new Date('2024-07-13'), value: 1712 },
                { date: new Date('2024-07-14'), value: 2103 },
                { date: new Date('2024-07-15'), value: 2291 },
                { date: new Date('2024-07-16'), value: 2341 },
                { date: new Date('2024-07-17'), value: 2780 }
            ]
        },{
            id: 'graph-2',
            label: 'COMPARAZIONE: FAN IN CLASSIFICAccia',
            dataset: [
                { date: new Date('2024-07-01'), value: 0 },
                { date: new Date('2024-07-02'), value: 67 },
                { date: new Date('2024-07-03'), value: 133 },
                { date: new Date('2024-07-04'), value: 167 },
                { date: new Date('2024-07-05'), value: 234 },
                { date: new Date('2024-07-06'), value: 311 },
                { date: new Date('2024-07-07'), value: 560 },
                { date: new Date('2024-07-08'), value: 666 },
                { date: new Date('2024-07-09'), value: 723 },
                { date: new Date('2024-07-10'), value: 899 },
                { date: new Date('2024-07-11'), value: 1101 },
                { date: new Date('2024-07-12'), value: 1101 },
                { date: new Date('2024-07-13'), value: 1101 },
                { date: new Date('2024-07-14'), value: 1101 },
                { date: new Date('2024-07-15'), value: 1101 },
                { date: new Date('2024-07-16'), value: 2674 },
                { date: new Date('2024-07-17'), value: 2999 },
                { date: new Date('2024-07-18'), value: 3417 },
                { date: new Date('2024-07-19'), value: 3765 },
                { date: new Date('2024-07-20'), value: 3998 },
                { date: new Date('2024-07-21'), value: 4465 },
                { date: new Date('2024-07-22'), value: 4465 },
                { date: new Date('2024-07-23'), value: 4465 },
                { date: new Date('2024-07-24'), value: 5012 },
                { date: new Date('2024-07-25'), value: 5678 },
                { date: new Date('2024-07-26'), value: 5777 },
                { date: new Date('2024-07-27'), value: 5777 },
                { date: new Date('2024-07-28'), value: 5777 },
                { date: new Date('2024-07-29'), value: 6465 },
                { date: new Date('2024-07-30'), value: 6714 },
                { date: new Date('2024-07-31'), value: 6999 },
            ],
            dataset2: [
                { date: new Date('2024-07-01'), value: 0 },
                { date: new Date('2024-07-02'), value: 211 },
                { date: new Date('2024-07-03'), value: 287 },
                { date: new Date('2024-07-04'), value: 344 },
                { date: new Date('2024-07-05'), value: 411 },
                { date: new Date('2024-07-06'), value: 520 },
                { date: new Date('2024-07-07'), value: 554 },
                { date: new Date('2024-07-08'), value: 698 },
                { date: new Date('2024-07-09'), value: 912 },
                { date: new Date('2024-07-10'), value: 994 },
                { date: new Date('2024-07-11'), value: 1381 },
                { date: new Date('2024-07-12'), value: 2291 },
                { date: new Date('2024-07-13'), value: 2291 },
                { date: new Date('2024-07-14'), value: 2291 },
                { date: new Date('2024-07-15'), value: 2291 },
                { date: new Date('2024-07-16'), value: 2341 },
                { date: new Date('2024-07-17'), value: 2780 }
            ]
        }
    ]

    return (
        <>
            <Navbar background='solid-black' />

            <Container style={'pt-xs-topbar pb-xs-appbar'}>
                <div>
                    <h1>{getCurrentMonthAndYear()}</h1>
                    <p className='fsize-xs-3 f-w-300 grey-200 letter-spacing-1 mt-xs-2'>Statistiche della classifica mensile da inizio mese ad oggi:</p>
                </div>

                <section className='mt-xs-2 mx-xs-auto'>
                    {metrics?.map(metric => {
                        return (
                            <WidgetMetric metric={metric} key={metric.id} />
                        )
                    })}

                    {graphs?.map(graph => {
                        return (
                            <Graph graph={graph} key={graph.id} />
                        )
                    })}
                </section>
            </Container>

            <Appbar />
        </>
    )
}

export default MetricsRoute