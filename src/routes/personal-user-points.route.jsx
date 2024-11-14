import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'

import { Link } from 'react-router-dom'

import NavbarBackOnly from "../components/navbar-back-only.component"
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import Carousel from '../layout/carousel.layout'
import CardPreferredArtist from '../components/card-preferred-artist.component'
import FullPageCenter from '../layout/full-page-center.layout'
import Button from '../components/button.component'

import IconPoints from '../images/icons/icon-points.svg'
import IconPlus from '../images/icons/icon-plus.svg'

import SearchInput from '../components/search-input.component'
import ValueSlider from '../components/value-slider.component'

const PersonalUserPointsRoute = () => {
    const navigate = useNavigate()

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)

    const [searchQuery, setSearchQuery] = useState('')
    const [showComponent, setShowComponent] = useState(false)
    const [idSelectedArtist, setIdSelectedArtist] = useState('')
    const [valueAssigned, setValueAssigned] = useState(0)

    const handleSliderChange = (value) => {
      setValueAssigned(value);
  }

    const assign = () => {
      console.log(valueAssigned)
      console.log('assigned')
      closeAssignements()
    }

    const showAssignments = (id) => {
      setIdSelectedArtist(id)
      console.log(idSelectedArtist)
      setShowComponent(true)
    }

    const closeAssignements = () => {
      setShowComponent(false)
    }


    const filteredItems = artists
        .filter(artist => {
            const isPreferred = currentFan.leaderboardsFollowed.some(preferred => preferred.artistId === artist.id)
            const matchesSearch = artist.artistName.toLowerCase().includes(searchQuery.toLowerCase())
            return isPreferred && (searchQuery === '' || matchesSearch)
        })

    const chunkArray = (array, chunkSize) => {
      const chunks = []
      for (let i = 0; i < array.length; i += chunkSize) {
          chunks.push(array.slice(i, i + chunkSize))
      }
      return chunks
    }

  const chunkedItems = chunkArray(filteredItems, 6)


  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)}/>
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <TextTitle title={'I tuoi punti'}></TextTitle>
            <div id='points' className={`d-flex-row align-items-center j-c-space-between w-100 z-index-5 mt-xs-2`}>
              <h2 className='fsize-xs-5 f-w-600 '>Assegna i tuoi punti</h2>
              <div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
                <div className='d-flex-row align-items-center'>
                  <div className='fsize-xs-3'>{currentFan?.pointTank} </div>
                  <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                </div>
              </div>
            </div>
            {currentFan?.pointTank > 0 ?
            <>
              
              <div id='search'>
                <SearchInput
                  value={searchQuery} 
                  onChange={(e) => {
                      const newValue = e.target.value
                      setSearchQuery(newValue)  
                  }}   
                />
              </div>
              <div id='assignment'>
                {chunkedItems.map((chunk, index) => (
                          <div className='mb-xs-8' key={index}>
                              <Carousel>
                                  {chunk.map(item => {
                                      return (
                                        <CardPreferredArtist 
                                          artist = {item}
                                          key = {item.id}
                                          onClick={() => showAssignments(item.id)}
                                        />
                                      )
                                  })}
                              </Carousel>
                          </div>
                  ))}
              </div>
            </>
            :
            <div id='no-points' className='d-flex-column mt-xs-2'>
              <h1 className='grey-400 fsize-xs-5 mt-xs-2 mt-xl-2 overflow-x'>Non hai ancora guadagnato punti extra!</h1>
            </div>
            }
            <div id='faq' className='mt-xs-2 d-flex-column'>
              <h2 className='fsize-xs-5 f-w-600'>Come guadagnare punti</h2>
              <div className='d-flex-column mt-xs-4'>
                <Link to='/profile'>
                {/* SE HO GIA' UNA FOTO PROFILO SCOMPARE */}
                    <div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
                        <div className='d-flex-row align-items-center w-100'>
                            <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Aggiungi una foto profilo</h6>
                        </div>
                        <div className='d-flex-row align-items-center'>
                        <div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
                          <div className='d-flex-row align-items-center'>
                            <div className='fsize-xs-3'>5</div>
                              <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                            </div>
                          </div>
                          <img className='' src={IconPlus} alt='->'/>
                        </div>
                    </div>
                </Link>
                <Link to='/user-info'>
                    <div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
                        <div className='d-flex-row align-items-center w-100'>
                            <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Aggiungi indirizzo</h6>
                        </div>
                        <div className='d-flex-row align-items-center'>
                        <div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
                          <div className='d-flex-row align-items-center'>
                            <div className='fsize-xs-3'>3</div>
                              <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                            </div>
                          </div>
                          <img className='' src={IconPlus} alt='->'/>
                        </div>
                    </div>
                </Link>
                <Link to='/search'>
                    <div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
                        <div className='d-flex-row align-items-center w-100'>
                            <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Segui almeno 10 artisti</h6>
                        </div>
                        <div className='d-flex-row align-items-center'>
                        <div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
                          <div className='d-flex-row align-items-center'>
                            <div className='fsize-xs-3'>10</div>
                              <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                            </div>
                          </div>
                          <img className='' src={IconPlus} alt='->'/>
                        </div>
                    </div>
                </Link>
              </div>
            </div>
    </ContainerDefault>
    {showComponent &&
      <FullPageCenter className={'z-index-max bg-black-transp70'}>
        <ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
            <section className='w-100'>
                <h2 className='fsize-xs-5 f-w-600 mb-xs-4'>Quanti punti?</h2>
                <ValueSlider max={currentFan.pointTank} onValueChange={handleSliderChange}/>
                <Button style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Assegna' onClick={assign}/>
            </section>
                    
            <a className='text-underline blue-300 f-w-400' onClick={closeAssignements}>Chiudi</a>
        </ContainerDefault>
      </FullPageCenter>
    }
    </>
  )
}

export default PersonalUserPointsRoute