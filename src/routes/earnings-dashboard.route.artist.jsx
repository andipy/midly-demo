import * as d3 from 'd3'
import { useContext, useState, useEffect } from 'react'

import Appbar from '../components/appbar.component.artist'
import Navbar from '../components/navbar.component.artist'
import ContainerDefault from '../layout/container-default.layout'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import Graph from '../components/graph.component.artist'
const EarningsDashboard = () => {

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

    /*Creo dataset 1 per revenue*/

    useEffect(() => {
        const revenueDataset = currentArtist.revenueOverTime[0].dataSet.map(data => ({
            date: new Date(data.date),
            value: data.value,
        }))
        const margin = { top: 10, bottom: 30, right: 20, left: 20 }
        const width = parseInt(d3.select('.container').style('width')) * 0.9 - margin.left - margin.right
        const height = 200 - margin.top - margin.bottom

        const svgContainer = d3.select(`#graph-1`)
        svgContainer.selectAll('*').remove()

        const svg = svgContainer
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        // Impostazione delle scale x e y
        const x = d3.scaleTime().range([0, width])
        const y = d3.scaleLinear().range([height, 0])

        // Imposta il dominio dell'asse x in modo che inizi dal primo dato e finisca all'ultimo mese dell'anno
        const startDate = new Date('2024-01-01')  
        const endDate = new Date('2024-12-01')          

        x.domain([startDate, endDate])

        // Impostazione del dominio dell'asse y
        y.domain([d3.min(revenueDataset, d => d.value), d3.max(revenueDataset, d => d.value)])

        // Aggiungi l'asse x con i ticks per ogni mese
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1)) // Forza il tick per ogni mese
                .tickFormat(d3.timeFormat('%b')))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')

        // Aggiungi l'asse y
        svg.append('g').call(d3.axisLeft(y).ticks(0))

        // Crea il generatore di linee
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))

        // Aggiungi il percorso della linea all'elemento SVG
        svg.append('path')
            .datum(revenueDataset)
            .attr('fill', 'none')
            .attr('stroke', '#5CBBFF')
            .attr('stroke-width', 2)
            .attr('d', line)

    }, [])


    /*Creo dataset 1 per subs*/

    useEffect(() => {
            
        const subsDataset = currentArtist.subsOverTime[0].dataSet.map(data => ({
            date: new Date(data.date),
            value: data.value,
        }))
        const margin = { top: 10, bottom: 30, right: 20, left: 20 }
        const width = parseInt(d3.select('.container').style('width')) * 0.9 - margin.left - margin.right
        const height = 200 - margin.top - margin.bottom

        const svgContainer = d3.select(`#graph-2`)
        svgContainer.selectAll('*').remove()

        const svg = svgContainer
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        // Impostazione delle scale x e y
        const x = d3.scaleTime().range([0, width])
        const y = d3.scaleLinear().range([height, 0])

        // Imposta il dominio dell'asse x in modo che inizi dal primo dato e finisca all'ultimo mese dell'anno
        const startDate = new Date('2024-01-01')  
        const endDate = new Date('2024-12-01')           

        x.domain([startDate, endDate])

        // Impostazione del dominio dell'asse y
        y.domain([0, d3.max(subsDataset, d => d.value)])

        // Aggiungi l'asse x con i ticks per ogni mese
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1)) 
                .tickFormat(d3.timeFormat('%b')))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')

        // Aggiungi l'asse y
        svg.append('g').call(d3.axisLeft(y).ticks(0))

        // Crea il generatore di linee
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))

        // Aggiungi il percorso della linea all'elemento SVG
        svg.append('path')
            .datum(subsDataset)
            .attr('fill', 'none')
            .attr('stroke', '#5CBBFF')
            .attr('stroke-width', 2)
            .attr('d', line)

    }, [])

  return (
    <>
    <Navbar />

    <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
        <section id='metrics' className='mt-xs-2 mr-xs-auto'>
            <div className=''>
                <h2 className='fsize-xs-5 f-w-600 mb-xs-2 '>MESE PRECEDENTE</h2>
                <div className='d-flex-column j-c-start align-items-start'>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Guadagni mese di {months[currentMonth-1]}:</h4>
                        </div>
                        <div className='mt-xs-2'>
                            <h4 className=''>{currentArtist?.lastMonthRevenue}€</h4>
                        </div>
                    </div>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100 mt-xs-8'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Fan iscritti fino a {months[currentMonth-1]}:</h4>
                        </div>
                        <div className='mt-xs-2'>
                            <h4 className=''>{subs}</h4>
                        </div>
                    </div>   
                </div>
            </div>
            <div className='mt-xs-4'>
                <h2 className='fsize-xs-5 f-w-600 mb-xs-2 '>MESE CORRENTE</h2>
                <div className='d-flex-column j-c-start align-items-start'>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Guadagni mese di {months[currentMonth-1]}:</h4>
                        </div>
                        <div className='mt-xs-2'>
                            <h4 className=''>{currentArtist?.currentMonthRevenue}€</h4>
                        </div>
                    </div>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100 mt-xs-8'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Fan iscritti fino a {months[currentMonth-1]}:</h4>
                        </div>
                        <div className='mt-xs-2'>
                            <h4 className=''>{subs+currentArtist?.currentMonthSubs}</h4>
                        </div>
                    </div>   
                </div>
            </div>
            
        </section>
        <section id='graph'>
        <div className='mt-xs-4'>
                <h2 className='fsize-xs-5 f-w-600 mb-xs-2 '>GUADAGNI MESI PRECEDENTI</h2>
                <div className='d-flex-column j-c-start align-items-start'>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Fino a {months[currentMonth-1]}:</h4>
                        </div>
                        <div id={'graph-1'} className='mt-xs-4'></div>   
                    </div>  
                </div>
        </div>
        <div className='mt-xs-4'>
                <h2 className='fsize-xs-5 f-w-600 mb-xs-2 '>ISCRITTI MESI PRECEDENTI</h2>
                <div className='d-flex-column j-c-start align-items-start'>
                    <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                        <div>
                            <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>Fino a {months[currentMonth-1]}:</h4>
                        </div>
                        <div id={'graph-2'} className='mt-xs-4'></div>   
                    </div>  
                </div>
        </div>
        </section>

    </ContainerDefault>



    <Appbar />

    </>
  )
}

export default EarningsDashboard