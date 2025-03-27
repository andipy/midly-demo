import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconPlus from '../images/icons/icon-plus-black.svg'
import IconPlusActive from '../images/icons/icon-plus-lime.svg'
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
        ${clicked ? 'scale-up ' : ''} ${showButtons ? 'bg-none border-lime' : 'bg-acid-lime'}`} 
      onClick={handleClick}
    >
      <img
          src={showButtons ? IconPlusActive : IconPlus}
          alt={clicked ? 'exit' : 'plus'}
          style={{
            transform: clicked ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s ease',
          }}
        />
    </button>

    {showButtons && (
        <div className={`circle-buttons ${!clicked ? 'reverse' : ''}`}>
          <button className="d-flex-column align-items-center j-c-center z-index-1400" alt={`button-${1}`} onClick={() => navigate('/artist-app/fanclub/forum/topic/creation')} >
            <div className='d-flex-column j-c-center align-items-center'  style={{ transform: 'rotate(270deg)' }} >
              <div className='avatar-40 bg-acid-lime border-radius-100 d-flex-row j-c-center align-items-center'>
                <img src={IconTopic} />
              </div>
              <p className='fsize-xs-0 f-w-300 lime-400'>Topic</p>
            </div>
          </button>
          <button className="d-flex-column align-items-center j-c-center  z-index-1400" alt={`button-${2}`}  onClick={() => navigate('/artist-app/concert-creation')} >
            <div className='d-flex-column j-c-center align-items-center'  style={{ transform: 'rotate(225deg)' }}  >
              <div className='avatar-40 bg-acid-lime border-radius-100 d-flex-row j-c-center align-items-center'>
                <img src={IconEvent} />
              </div>
              <p className='fsize-xs-0 f-w-300 lime-400'>Evento</p>
            </div>
          </button>
          <button className="d-flex-column align-items-center j-c-center z-index-1400" alt={`button-${3}`}  onClick={() => navigate('/artist-app/content-creation')} >
            <div className='d-flex-column j-c-center align-items-center' style={{ transform: 'rotate(180deg)' }}>
              <div className='avatar-40 bg-acid-lime border-radius-100 d-flex-row j-c-center align-items-center'>
                <img src={IconContent} />
              </div>
              <p className='fsize-xs-0 f-w-300 lime-400'>Contenuti</p>
            </div>
          </button>
        </div>
      )}
    </div>
    {
        bg &&
        <FullPageCenter style='z-index-1200 bg-black-transp90'>
        
        </FullPageCenter>
    }
    </>
    
  )
}

export default CreateButton