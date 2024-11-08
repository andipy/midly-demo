import { useState } from "react"

import BadgeHeader from '../images/illustrations/badge-top.jpg'
import BadgeLogoIcon from '../images/logo/badge-logo-icon.svg'
import BadgeMonthly from "./badge-monthly.component"
import BadgeLogo from '../images/logo/badge-logo.png'

function BadgeMonthlyMiniature({badge, onClick, selected}) {
    const handleClick = () => {
        onClick();
    }

    const month = {
        1: '01',
        2: '02',
        3: '03',
        4: '04',
        5: '05',
        6: '06',
        7: '07',
        8: '08',
        9: '09',
        10: '10',
        11: '11',
        12: '12'
    }

  return (
    <div className='mr-xs-2 d-flex-column j-c-center align-items-center j-c-center' onClick={handleClick}>
        <div className="d-flex-column position-relative">
        <div className='d-flex-column'>
            <img src={BadgeHeader} className={`avatar-60 border-radius-08 ${selected ? 'border-lime-6' : ''}`}/> 
            <img src={BadgeLogoIcon}  className="w-30 position-absolute-x-y z-index-5"/>
        </div>
      </div>
            <div className='d-flex-column z-index-2'>
                <h5 className='fsize-xs-1 mb-xs-2 f-w-500 letter-spacing-1'>{month[badge.month]}/{badge.year}</h5>
            </div>
    </div>
  )
}

export default BadgeMonthlyMiniature