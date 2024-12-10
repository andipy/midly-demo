import * as d3 from 'd3'
import { useContext, useState, useEffect } from 'react'
import { CurrentArtistContext } from '../contexts/currentArtist.context'


const EarningsGraph = () => {
    const { currentArtist } = useContext(CurrentArtistContext)
    const [currentMonth, setCurrentMonth] = useState(1)

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

    }, [currentArtist])

    /*Creo dataset 1 per revenue*/

    useEffect(() => {

        const revenueDataset = currentArtist?.revenueOverTime[0].dataSet.map(data => ({
            date: new Date(data.date),
            value: data.value,
        }))
        const revenueDatasetWithFirstDay = revenueDataset.map(d => {
            const date = new Date(d.date)
            date.setDate(1)
            return { date, value: d.value }
        })
    
        const allMonths = Array.from({ length: currentMonth-1 }, (_, i) => new Date(2024, i, 1))
        const completeRevenueDataset = allMonths?.map(month => {
            const existingData = revenueDatasetWithFirstDay.find(d => d.date.getMonth() === month.getMonth())
            
            return existingData ? existingData : { date: month, value: 0 }
        })

        const margin = { top: 10, bottom: 30, right: 20, left: 40 }
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
        const x = d3.scaleBand()
            .range([0, width])
            .domain(completeRevenueDataset.map(d => d.date)) 
            .padding(0.2) 
    
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(completeRevenueDataset, d => d.value)])
    
        // Aggiungi l'asse x con i ticks per ogni mese
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3.axisBottom(x)
                    .tickFormat(d3.timeFormat('%b')) 
            )
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
    
        // Aggiungi l'asse y
        svg.append('g')
            .call(d3.axisLeft(y).ticks(5))
    
        // Aggiungi le barre
        svg.selectAll('.bar')
            .data(completeRevenueDataset)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.date)) 
            .attr('y', d => y(d.value)) 
            .attr('width', x.bandwidth()) 
            .attr('height', d => height - y(d.value))
            .attr('fill', '#5CBBFF') 

    }, [currentArtist])


    /*Creo dataset 1 per subs*/

    useEffect(() => {

        const currentDate = new Date();
        const firstDayOfPreviousMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        )
            
        const subsDataset = currentArtist.subsOverTime[0].dataSet.map(data => ({
            date: new Date(data.date),
            value: data.value,
        }))
        const completeSubsDataset = subsDataset.map(d => {
            const date = new Date(d.date)
            date.setDate(1)
            return { date, value: d.value }
        })

        const margin = { top: 10, bottom: 30, right: 20, left: 40 }
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
        const endDate =   firstDayOfPreviousMonth    

        x.domain([startDate, endDate])

        // Impostazione del dominio dell'asse y
        y.domain([0, d3.max(completeSubsDataset, d => d.value)])

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
        svg.append('g').call(d3.axisLeft(y))

        // Crea il generatore di linee
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))

        // Aggiungi il percorso della linea all'elemento SVG
        svg.append('path')
            .datum(completeSubsDataset)
            .attr('fill', 'none')
            .attr('stroke', '#5CBBFF')
            .attr('stroke-width', 2)
            .attr('d', line)

        svg.selectAll('.horizontal-line')
            .data(completeSubsDataset)
            .enter()
            .append('line')
            .attr('class', 'horizontal-line')
            .attr('x1', 0) 
            .attr('x2', d => x(d.date)) 
            .attr('y1', d => y(d.value))
            .attr('y2', d => y(d.value)) 
            .attr('stroke', '#DAEF64') 
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '4,4')

    }, [])
  return (
    <>
        <section id='graph'>
                <div className='mt-xs-4'>
                    <div className='d-flex-column j-c-start align-items-start'>
                        <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                            <div>
                                <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>GUADAGNI:</h4>
                            </div>
                            <div id={'graph-1'} className='mt-xs-4'></div>   
                        </div>  
                    </div>
            </div>
            <div className='mt-xs-4'>
                    <div className='d-flex-column j-c-start align-items-start'>
                        <div className='d-flex-column align-items-start j bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pb-xs-4 pt-xs-4 w-100'>
                            <div>
                                <h4 className='fsize-xs-1 grey-300 letter-spacing-1'>ABBONAMENTI:</h4>
                            </div>
                            <div id={'graph-2'} className='mt-xs-4'></div>   
                        </div>  
                    </div>
            </div>
        </section>
    </>
  )
}

export default EarningsGraph