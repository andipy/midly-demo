import { useEffect, useState, useContext } from 'react'

import { FansContext } from '../contexts/fans.context'

import img2 from '../images/pictures/thasup.jpg'
import Container from '../layout/container.layout'

const Notification = (notification) => {

    const { fans} = useContext(FansContext)

    const [users, setUSers] = useState()
    useEffect(() => {
        if (notification.notification.users.length === 1){
            setUSers(`${notification.notification.users[0].userName}`)
        } else if (notification.notification.users.length === 2) {
            setUSers(`${notification.notification.users[0].userName} e 1 altro`)
        } else {
            setUSers(`${notification.notification.users[0].userName}, ${notification.notification.users[1].userName} e ${notification.notification.users.length} altri`)
        }
    }, [notification])

    const [type, setType] = useState()
    useEffect(() => {
        if ((notification.notification.type === 'LIKE') && (notification.notification.users.length === 1)) {
            setType('ha messo "Mi piace" al tuo commento')
        } else if ((notification.notification.type === 'LIKE') && (notification.notification.users.length >= 1)) {
            setType('hanno messo "Mi piace" al tuo commento')
        } else if ((notification.notification.type === 'REPLY')) {
            setType('ha risposto al tuo commento:')
        } else if ((notification.notification.type === 'COMMENT')) {
            setType('ha commentato il tuo contenuto:')
        }
    }, [notification])

    const [userImage, setUserImage] = useState()
    useEffect(() => {
        const fan = fans.find(fan => fan?.id === notification.notification.users[0]?.id)

        if (fan) {
            setUserImage(fan.image)
        } else {
            setUserImage(null)
        }
    }, [notification, fans])

    /* const [days, setDays] = useState(0)
    useEffect(() => {
        const specificDate = new Date(notification.notification.date) // Inserisci qui la data specifica
        const currentDate = new Date()

        const timeDifference = currentDate - specificDate
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

        setDays(daysPassed)
    }, [notification]) */


  return (
    <>
    {notification.notification.read === true ? (
        <div className="d-flex-row j-c-start align-items-center bg-black w-100 ">
            <div className='pl-xs-2'>
                <div className='avatar-6 bg-black border-radius-100'></div>
            </div>
        <Container >
        <div className="d-flex-row align-items-center j-c-space-between pt-xs-2 pb-xs-2 pr-xs-2">
            <div className='d-flex-row align-items-center  j-c-start w-100'>
                <img className="avatar-48 border-radius-100" src={userImage}/>
                <div className="d-flex-column j-c-start align-items-start ml-xs-4">
                    <p className="fsize-xs-1 f-w-600">{users}</p>
                    <p className="fsize-xs-0 f-w-200">{type} {((notification.notification.type === 'REPLY') || (notification.notification.type === 'COMMENT')) && `${notification.notification.text}`}</p>
                </div>
            </div>
            
            <div className='d-flex-row ml-xs-2'>
                <img className='avatar-48 border-radius-02' src={img2} />
            </div>
        </div>
        
        </Container>
        
    </div>

    ) : (
        <div className="d-flex-row j-c-start align-items-center bg-dark-soft w-100">
            <div className='pl-xs-2'>
                <div className='avatar-6 bg-red-300 border-radius-100'></div>
            </div>
        <Container>
        <div className="d-flex-row align-items-center j-c-space-between pt-xs-2 pb-xs-2 pr-xs-2">
            <div className='d-flex-row align-items-center  j-c-start'>
                <img className="avatar-48 border-radius-100" src={userImage}/>
                <div className="d-flex-column j-c-start align-items-start ml-xs-4">
                    <p className="fsize-xs-1 f-w-600">{users}</p>
                    <p className="fsize-xs-0 f-w-200">{type} {(notification.notification.type === 'REPLY') || (notification.notification.type === 'COMMENT')  && `${notification.notification.text}`}</p>
                </div>
            </div>
            
            <div className='d-flex-row ml-xs-2'>
                <img className='avatar-48 border-radius-02' src={img2} />
            </div>
        </div>
        
        </Container>
        
    </div>

    )}
    </>
    
    
  )
}

export default Notification