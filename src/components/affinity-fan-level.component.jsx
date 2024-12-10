import React, { useEffect, useState } from 'react'

function AffinityFanLevel({ value, max, image }) {

    const [progressPercent, setProgressPercent] = useState(0)

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
    )
}

export default AffinityFanLevel