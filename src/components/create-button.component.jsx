import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconPlus from '../images/icons/icon-plus-black.svg'
import IconContent from '../images/icons/icon-content.svg'
import IconEvent from '../images/icons/icon-event.svg'
import IconTopic from '../images/icons/icon-topic.svg'
import IconExit from '../images/icons/icon-exit-black.svg'
import FullPageCenter from '../layout/full-page-center.layout'

const CreateButton = ({}) => {
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    const handleClick = () => {
        if (clicked) {
        setClicked(false)
        setTimeout(() => {
            setShowButtons(false)
            setBg()
        }, 250)
        } else {
            setBg()
        setShowButtons(true)
        setClicked(true)
        setBg(true)
        }
    }
    const [bg, setBg] = useState(false)

  return (
    <>
    <div className="button-container z-index-1300">
      <button
      className={`d-flex-row align-items-center j-c-center fsize-xs-2 f-w-500 avatar-32 border-radius-100 transition-all 
        ${clicked ? 'scale-up ' : ''} ${showButtons ? 'bg-dark-soft-2 ' : 'bg-acid-lime'}`} 
      onClick={handleClick}
    >
      <img
          src={IconPlus}
          alt={clicked ? 'exit' : 'plus'}
          style={{
            transform: clicked ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.6s ease',
          }}
        />
    </button>

    {showButtons && (
        <div className={`circle-buttons ${!clicked ? 'reverse' : ''}`}>
          <button className="bg-acid-lime d-flex-column align-items-center j-c-center avatar-40 border-radius-100 z-index-1400" alt={`button-${1}`} onClick={() => navigate('/artist-app/fanclub/forum/topic/creation')} >
            <div className='d-flex-column j-c-center align-items-center'>
            <img src={IconTopic}  style={{ transform: 'rotate(270deg)' }} />
            </div>
          </button>
          <button className="bg-acid-lime d-flex-column align-items-center j-c-center fsize-xs-2 f-w-500 avatar-40 border-radius-100 z-index-1400" onClick={() => navigate('/artist-app/concert-creation')} >
            <img src={IconEvent} alt={`button-${2}`} style={{ transform: 'rotate(225deg)' }} />
          </button>
          <button className="bg-acid-lime d-flex-column align-items-center j-c-center avatar-40 border-radius-100 z-index-1400" onClick={() => navigate('/artist-app/content-creation')} >
            <img 
              src={IconContent} 
              alt={`button-${3}`} 
              style={{ transform: 'rotate(180deg)' }} 
            />
          </button>
        </div>
      )}
    </div>
    {
        bg &&
        <FullPageCenter style='z-index-1200 bg-black-transp70'>
        
        </FullPageCenter>
    }
    </>
    
  )
}

export default CreateButton