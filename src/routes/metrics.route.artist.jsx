import { useEffect, useState } from 'react'
import * as d3 from 'd3'

import Navbar from '../components/navbar.component.artist'
import Appbar from '../components/appbar.component.artist'
import SimpleSpinnerLoader from '../components/simple-spinner-loader.component'


const MetricsRoute = () => {

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 3000)

    useEffect(() => {
        if ( !isLoading ) {
            const margin = {
                top: 20,
                bottom: 20,
                right: 10,
                left: 20
            };
            const width = parseInt(d3.select(".container").style("width")) * 0.85;
            const height = 200;
        
            // Set up the x and y scales
            const x = d3.scaleTime()
                .range([0, width]);
        
            const y = d3.scaleLinear()
                .range([height, 0]);
        
            // Create the SVG element and append it to the chart container
            const svg = d3.select("#graph")
                .append("svg")
                    .attr("width", width)
                    .attr("height", height + margin.top)
            
            const svg2 = d3.select("#graph-2")
                .append("svg")
                    .attr("width", width)
                    .attr("height", height + margin.top)
        
            // Create a fake dataset
            const dataset = [
                { date: new Date("2024-07-01"), value: 0 },
                { date: new Date("2024-07-02"), value: 67 },
                { date: new Date("2024-07-03"), value: 133 },
                { date: new Date("2024-07-04"), value: 167 },
                { date: new Date("2024-07-05"), value: 234 },
                { date: new Date("2024-07-06"), value: 311 },
                { date: new Date("2024-07-07"), value: 560 },
                { date: new Date("2024-07-08"), value: 666 },
                { date: new Date("2024-07-09"), value: 723 },
                { date: new Date("2024-07-10"), value: 899 },
                { date: new Date("2024-07-11"), value: 1101 },
                { date: new Date("2024-07-12"), value: 1399 },
                { date: new Date("2024-07-13"), value: 1601 },
                { date: new Date("2024-07-14"), value: 2007 },
                { date: new Date("2024-07-15"), value: 2345 },
                { date: new Date("2024-07-16"), value: 2674 },
                { date: new Date("2024-07-17"), value: 2999 },
                { date: new Date("2024-07-18"), value: 3417 },
                { date: new Date("2024-07-19"), value: 3765 },
                { date: new Date("2024-07-20"), value: 3998 },
                { date: new Date("2024-07-21"), value: 4465 },
                { date: new Date("2024-07-22"), value: 4678 },
                { date: new Date("2024-07-23"), value: 4886 },
                { date: new Date("2024-07-24"), value: 5012 },
                { date: new Date("2024-07-25"), value: 5678 },
                { date: new Date("2024-07-26"), value: 5777 },
                { date: new Date("2024-07-27"), value: 5992 },
                { date: new Date("2024-07-28"), value: 6233 },
                { date: new Date("2024-07-29"), value: 6465 },
                { date: new Date("2024-07-30"), value: 6714 },
                { date: new Date("2024-07-31"), value: 6999 },
            ];
        
            const dataset2 = [
                { date: new Date("2024-07-01"), value: 0 },
                { date: new Date("2024-07-02"), value: 211 },
                { date: new Date("2024-07-03"), value: 287 },
                { date: new Date("2024-07-04"), value: 344 },
                { date: new Date("2024-07-05"), value: 411 },
                { date: new Date("2024-07-06"), value: 520 },
                { date: new Date("2024-07-07"), value: 554 },
                { date: new Date("2024-07-08"), value: 698 },
                { date: new Date("2024-07-09"), value: 912 },
                { date: new Date("2024-07-10"), value: 994 },
                { date: new Date("2024-07-11"), value: 1381 },
                { date: new Date("2024-07-12"), value: 1699 },
                { date: new Date("2024-07-13"), value: 1712 },
                { date: new Date("2024-07-14"), value: 2103 },
                { date: new Date("2024-07-15"), value: 2291 },
                { date: new Date("2024-07-16"), value: 2341 },
                { date: new Date("2024-07-17"), value: 2780 }
            ];
        
            // Define the x and y domains
            x.domain(d3.extent(dataset, d => d.date));
            y.domain([0, d3.max(dataset, d => d.value)]);
        
            // Add the x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(7)) 
                    .tickFormat(d3.timeFormat("%b %Y"))); 
        
            svg2.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(7)) 
                    .tickFormat(d3.timeFormat("%b %Y")));
        
            //Add the y-axis
            svg.append("g")
                .call(d3.axisLeft(y))
            
            svg2.append("g")
                .call(d3.axisLeft(y))
        
            // Create the line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));
            
            const line2 = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));
        
            // Add the line path to the SVG element
        
            svg.append("path")
                .datum(dataset)
                .attr("fill", "none")
                .attr("stroke", "#5CBBFF")
                .attr("stroke-width", 2)
                .attr("d", line);
            
            svg.append("path")
                .datum(dataset2)
                .attr("fill", "none")
                .attr("stroke", "#DAEF64")
                .attr("stroke-width", 2)
                .attr("d", line2);
        
            svg2.append("path")
                .datum(dataset)
                .attr("fill", "none")
                .attr("stroke", "#5CBBFF")
                .attr("stroke-width", 2)
                .attr("d", line);
            
            svg2.append("path")
                .datum(dataset2)
                .attr("fill", "none")
                .attr("stroke", "#DAEF64")
                .attr("stroke-width", 2)
                .attr("d", line2);
        }
    }, [isLoading])

    

    return (
        <>
        <Navbar />
        
        <div className="container pb-xs-appbar pt-xs-topbar">
            <div id="current-month">
                <h1>Luglio 2024</h1>
                <p className="fsize-xs-3 f-w-300 grey-200 letter-spacing-1 mt-xs-2">Da inizio mese ad oggi:</p>
            </div>

            <section id="metrics-full-state" className="mt-xs-2 mx-xs-auto">
                <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
                    <p className="fsize-xs-1 grey-300 letter-spacing-3">FAN IN CLASSIFICA</p>
                    <div className="d-flex-row align-items-center gap-1em mt-xs-6">
                        <h4 className="fsize-xs-8 letter-spacing-2 f-w-500">7'666</h4>
                        <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 bg-green-900 border-radius-02"><span className="green-400 f-w-400">+3.6</span> Rispetto a ieri</p>
                    </div>
                </div>
                <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
                    <p className="fsize-xs-1 grey-300 letter-spacing-3">STREAM GENERATI DAI FAN</p>                    
                    <div className="d-flex-row align-items-center gap-1em mt-xs-6">
                        <h4 className="fsize-xs-8 letter-spacing-2 f-w-500">177K</h4>
                        <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 bg-green-900 border-radius-02"><span className="green-400 f-w-400">+2.7</span> Rispetto a ieri</p>
                    </div>
                </div>
                <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
                    <p className="fsize-xs-1 grey-300 letter-spacing-3">ASCOLTI MEDI PER FAN</p>                    
                    <div className="d-flex-row align-items-center gap-1em mt-xs-6">
                        <h4 className="fsize-xs-8 letter-spacing-2 f-w-500">113</h4>
                        <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 bg-red-900 border-radius-02"><span className="red-400 f-w-400">-1.7</span> Rispetto a ieri</p>
                    </div>
                </div>                
            </section>

            <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
                <p className="fsize-xs-1 grey-300 letter-spacing-3 mb-xs-4">COMPARAZIONE: STREAM</p>

                <div className="d-flex-row align-items-center gap-1em mb-xs-8">
                    <div className="d-flex-row align-items-center">
                        <div className="avatar-16 bg-acid-lime border-radius-02 no-shrink"></div>
                        <span className="fsize-xs-1 grey-300 ml-xs-2 no-shrink">Mese corrente</span>
                    </div>

                    <div className="d-flex-row align-items-center">
                        <div className="avatar-16 bg-blue-400 border-radius-02 no-shrink"></div>
                        <span className="fsize-xs-1 grey-300 ml-xs-2 no-shrink">Mese precedente</span>
                    </div>
                </div>

                {isLoading ?
                    <div className='mt-xs-8 mb-xs-8'>
                        <SimpleSpinnerLoader />
                    </div>
                :
                    <div id="graph"></div>
                }
            </div>

            <div className="w-100 bg-dark-gradient d-flex-column j-c-center border-radius-08 pl-xs-8 pr-xs-8 pt-xs-8 pb-xs-8 mt-xs-4">
                <p className="fsize-xs-1 grey-300 letter-spacing-3 mb-xs-4">COMPARAZIONE: FAN IN CLASSIFICA</p>

                <div className="d-flex-row align-items-center gap-1em mb-xs-8">
                    <div className="d-flex-row align-items-center">
                        <div className="avatar-16 bg-acid-lime border-radius-02 no-shrink"></div>
                        <span className="fsize-xs-1 grey-300 ml-xs-2 no-shrink">Mese corrente</span>
                    </div>

                    <div className="d-flex-row align-items-center">
                        <div className="avatar-16 bg-blue-400 border-radius-02 no-shrink"></div>
                        <span className="fsize-xs-1 grey-300 ml-xs-2 no-shrink">Mese precedente</span>
                    </div>
                </div>

                {isLoading ?
                    <div className='mt-xs-8 mb-xs-8'>
                        <SimpleSpinnerLoader />
                    </div>
                :
                    <div id="graph-2"></div>
                }
            </div>
        </div>

        <Appbar />
        </>
    )
}

export default MetricsRoute