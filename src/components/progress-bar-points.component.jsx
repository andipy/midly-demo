import { useState, useContext, useEffect, useRef } from "react"
import { CurrentFanContext } from '../contexts/currentFan.context'

const ProgressBar = ({points, max}) => {
    
    

    const percent = Math.min((points / max) * 100, 100); //100%

  return (
    <div className="d-flex-row w-100">
        <div className="w-100 h-20px bg-white border-radius-08 overflow-all-hidden">
            <div className="h-100 bg-acid-lime " style={{ width: `${percent}%` }}>

            </div>
            
        </div>
        {/* <span className="white">
                {points}
        </span> */}
    </div>
  )
}

export default ProgressBar