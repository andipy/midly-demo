import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'

import Container from '../layout/container.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'
import IconArrowRight from '../images/icons/icon-arrowright.svg'

const SubscriptionsSettingsRoute = () => {
  const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
  const { fanclubs } = useContext(FanclubsContext)
  const {artists } = useContext(ArtistsContext)

  const getDay = (date) => {
    if ( date ) {
      const [, , day] = date.split('-')
        return day.padStart(2, '0')
    }
}

const getNextMonth = (date) => {
    if ( date ) {
        const [, month] = date.split('-')
        let monthNumber = parseInt(month, 10)
        monthNumber = (monthNumber % 12) + 1
        return monthNumber.toString().padStart(2, '0')
    }
}

const getMonth = (date) => {
  if ( date ) {
      const [, month] = date.split('-')
      let monthNumber = parseInt(month, 10)
      return monthNumber.toString().padStart(2, '0')
  }
}

  return (
    <>
      <NavbarProfileSettings title={'Abbonamenti'} />
      <Container style={'pt-xs-topbar pb-xs-8'}>
        <section>
          <h4 className='fsize-xs-5 mb-xs-4 mb-lg-2 letter-spacing-2 f-w-500'>Abbonamenti attivi</h4>
          {currentFan?.fanclubsSubscribed?.length > 0 ?
            <>
            {currentFan?.fanclubsSubscribed?.map(subscription => {
                const fanclub = fanclubs?.find(fc => fc?.artistId === subscription.artistId)
                const artist = artists?.find(a => a.id === subscription.artistId)
                console.log(fanclub)
                console.log(artist)
                return fanclub ? (
                  <div className='d-flex-row j-c-space-between align-items-center w-100'>
                    <div className='d-flex-row j-c-start align-items-start w-100'>
                      <div className='avatar-60 border-radius-08'>
                        <img className='avatar-60 border-radius-08' src={artist?.image}></img>
                      </div>
                      <div className='d-flex-column j-c-start align-items-start ml-xs-4'>
                        <p className='fsize-xs-3 f-w-500'>{artist.artistName}</p>
                        <p className='fsize-xs-1 f-w-300'>Si rinnova il giorno {getDay(subscription?.createdAt)}/{getNextMonth(subscription?.createdAt)}</p>
                      </div>
                    </div>
                    <div className='d-flex-row j-c-end align-items-center'>
                      <p className='fsize-xs-1 f-w-500'>{fanclub.pricing + '€'}</p>
                      <img src={IconArrowRight}></img>
                    </div>
                  </div>
                ) : null
            })}
            </>
          :
            <>
            <p>Non ci sono abbonamenti attivi!</p>
            </>
          }
        </section>
        <section className='mt-xs-12'>
          <h4 className='fsize-xs-5 mb-xs-4 mb-lg-2 letter-spacing-2 f-w-500'>Abbonamenti scaduti</h4>
          {currentFan?.removedSubscriptions?.length > 0 ?
            <>
            {currentFan?.removedSubscriptions?.map(subscription => {
                const fanclub = fanclubs?.find(fc => fc?.artistId === subscription.artistId)
                const artist = artists?.find(a => a.id === subscription.artistId)
                console.log(fanclub)
                console.log(artist)
                return fanclub ? (
                  <div className='d-flex-row j-c-space-between align-items-center w-100'>
                    <div className='d-flex-row j-c-start align-items-start w-100'>
                      <div className='avatar-60 border-radius-08'>
                        <img className='avatar-60 border-radius-08' src={artist?.image}></img>
                      </div>
                      <div className='d-flex-column j-c-start align-items-start ml-xs-4'>
                        <p className='fsize-xs-3 f-w-500'>{artist.artistName}</p>
                        <p className='fsize-xs-1 f-w-300'>Abbonamento terminato il {getDay(subscription?.createdAt)}/{getMonth(subscription?.createdAt)}</p>
                      </div>
                    </div>
                    <div className='d-flex-row j-c-end align-items-center'>
                      <img src={IconArrowRight}></img>
                    </div>
                  </div>
                ) : null
            })}
            </>
          :
            <>
            <p>Non ci sono abbonamenti scaduti!</p>
            </>
          }
        </section>
      </Container>
    </>
  )
}

export default SubscriptionsSettingsRoute