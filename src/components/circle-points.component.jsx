import React, { useEffect, useState } from 'react'

function CirclePoints({ points }) {
    const [progressPercent, setProgressPercent] = useState(0)
    const radius = 100
    const circumference = 2 * Math.PI * radius

    useEffect(() => {
        const targetPercent = (points / 5) * 100 
        let start = null

        const animate = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / 15, targetPercent)
            setProgressPercent(progress)

            if (progress < targetPercent) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [points])

    const strokeDashoffset = circumference - (progressPercent / 100) * circumference

    return (
        <div className=''>
            <div className='countdown-circle'>
                <svg width="250" height="250">
                    <circle r="95" cx="125" cy="125" className="track" style={{ fill: 'rgba(0,0,0,0.3)', stroke: '#8d8d8d', strokeWidth: '30px'}}></circle>
                    {/* Cerchio del progresso */}
                    <circle
                        r="95"
                        cx="125"
                        cy="125"
                        className="progress"
                        style={{
                            fill: 'none',
                            stroke: '#DAEF64',
                            strokeWidth: '30px',
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: circumference - (progressPercent / 100) * circumference
                        }}
                    ></circle>
                    <text
                        x="50%"
                        y="50%"
                        style={{ transform: "none", fill: '#DAEF64', fontSize: '85px', fontWeight: "bold" }}
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        +{points}
                    </text>
                </svg>
            </div>
        </div>
    )
}

export default CirclePoints