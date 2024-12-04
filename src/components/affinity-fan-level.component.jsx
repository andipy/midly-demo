import React, { useEffect, useState } from 'react'

function AffinityFanLevel({ value, max, image }) {
    console.log(value, 'value')
    const [progressPercent, setProgressPercent] = useState(0)
    
    // const radius = 60
    // const circumference = 2 * Math.PI * radius
    // useEffect(() => {
    //     const targetProgress = (value / max) * 100
    //     let start = null

    //     const animate = (timestamp) => {
    //         if (!start) start = timestamp
    //         const progress = Math.min((timestamp - start) / 15, targetProgress)
    //         setProgressPercent(progress)

    //         if (progress < targetProgress) {
    //             requestAnimationFrame(animate)
    //         }
    //     }

    //     requestAnimationFrame(animate)
    // }, [value])

    // const strokeDashoffset = circumference - (progressPercent / 100) * circumference

    useEffect(() => {
        setTimeout(() => {
            const targetProgress = (value / max) * 360
            const animationDuration = 1500
            let start = null
            let animationFrame
        
            const easeOutQuart = (t) => 1 - (--t) * t * t * t
        
            const animate = (timestamp) => {
                if (!start) start = timestamp
        
                const elapsed = timestamp - start
                const t = Math.min(elapsed / animationDuration, 1)
                const easedProgress = easeOutQuart(t) * targetProgress
        
                setProgressPercent(easedProgress)
        
                if (t < 1) {
                    animationFrame = requestAnimationFrame(animate)
                }
            }
        
            animationFrame = requestAnimationFrame(animate)
        
            return () => {
                cancelAnimationFrame(animationFrame)
            }
        }, 800)
    }, [value, max])

    return (
        <div
            className='load-border'
            style={{background: `conic-gradient(#DAEF64 0deg, #DAEF64 ${progressPercent}deg, transparent ${progressPercent * 1.1}deg)`}}
        >
            <img src={image} />
        </div>

        // <div
        //     style={{ position: 'relative', display: 'inline-block' }}
        // >
        //     <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        //         <circle
        //             r={radius}
        //             cx="70"
        //             cy="70"
        //             className="track"
        //             style={{
        //                 fill: 'none',
        //                 stroke: '#8d8d8d', 
        //                 strokeWidth: '15px',
        //             }}
        //         />
        //         <circle
        //             r={radius}
        //             cx="70"
        //             cy="70"
        //             className="progress"
        //             style={{
        //                 fill: 'none',
        //                 stroke: '#DAEF64', 
        //                 strokeWidth: '15px',
        //                 strokeDasharray: `${circumference} ${circumference}`,
        //                 strokeDashoffset: strokeDashoffset,
        //                 transition: 'stroke-dashoffset 0.5s ease', 
        //             }}
        //         />
        //     </svg>
        //     <img
        //         src={image}
        //         style={{
        //             width: '110px',
        //             height: '110px',
        //             borderRadius: '50%',
        //             position: 'absolute',
        //             top: '49%',
        //             left: '50%',
        //             transform: 'translate(-50%, -50%)',
        //             objectFit: 'cover', 
        //         }}
        //     />
        // </div>
    )
}

export default AffinityFanLevel