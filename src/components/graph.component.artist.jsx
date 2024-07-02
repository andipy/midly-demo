import * as d3 from 'd3'
import { useEffect, useState } from 'react'

import SimpleSpinnerLoader from './simple-spinner-loader.component'


const Graph = ({ graph }) => {

    const { dataset, dataset2, label, id } = graph

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [graph])

    useEffect(() => {
        if ( !isLoading ) {
            const margin = {
                top: 20,
                bottom: 20,
                right: 10,
                left: 20
            };
            const width = parseInt(d3.select('.container').style('width')) * 0.85;
            const height = 200;
        
            // Set up the x and y scales
            const x = d3.scaleTime()
                .range([0, width]);
        
            const y = d3.scaleLinear()
                .range([height, 0]);
        
            // Create the SVG element and append it to the chart container
            const svg = d3.select(`#${id}`)
                .append('svg')
                    .attr('width', width)
                    .attr('height', height + margin.top)
        
            // Define the x and y domains
            x.domain(d3.extent(dataset, d => d.date));
            y.domain([0, d3.max(dataset, d => d.value)]);
        
            // Add the x-axis
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(7)) 
                    .tickFormat(d3.timeFormat('%b %Y')))
        
            //Add the y-axis
            svg.append('g')
                .call(d3.axisLeft(y))
        
            // Create the line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));
            
            const line2 = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));
        
            // Add the line path to the SVG element
        
            svg.append('path')
                .datum(dataset)
                .attr('fill', 'none')
                .attr('stroke', '#5CBBFF')
                .attr('stroke-width', 2)
                .attr('d', line);
            
            svg.append('path')
                .datum(dataset2)
                .attr('fill', 'none')
                .attr('stroke', '#DAEF64')
                .attr('stroke-width', 2)
                .attr('d', line2);
        }
    }, [isLoading])

    return (
        <div className='w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4'>
            <p className='fsize-xs-1 grey-300 letter-spacing-3 mb-xs-4'>{label}</p>

            <div className='d-flex-row align-items-center gap-1em mb-xs-8'>
                <div className='d-flex-row align-items-center'>
                    <div className='avatar-16 bg-acid-lime border-radius-02 no-shrink'></div>
                    <span className='fsize-xs-1 grey-300 ml-xs-2 no-shrink'>Mese corrente</span>
                </div>

                <div className='d-flex-row align-items-center'>
                    <div className='avatar-16 bg-blue-400 border-radius-02 no-shrink'></div>
                    <span className='fsize-xs-1 grey-300 ml-xs-2 no-shrink'>Mese precedente</span>
                </div>
            </div>

            {isLoading ?
                <div className='mt-xs-8 mb-xs-8'>
                    <SimpleSpinnerLoader />
                </div>
            :
                <div id={id}></div>
            }

        </div>
    )
}

export default Graph