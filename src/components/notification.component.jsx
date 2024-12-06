import { useEffect, useState, useContext } from 'react'

import { FansContext } from '../contexts/fans.context'

import img2 from '../images/pictures/thasup.jpg'
import ContainerDefault from '../layout/container-default.layout'

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
        } else if ((notification.notification.type === 'LIKE')) {
            setType('ha risposto al tuo commento')
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


  return (
    <>
    {notification.notification.read === true ? (
        <div className="d-flex-row j-c-start align-items-center bg-black w-100vw ">
            <div className='pl-xs-2'>
                <div className='avatar-6 bg-black border-radius-100'></div>
            </div>
        <ContainerDefault >
        <div className="d-flex-row align-items-center j-c-space-between pt-xs-1 pb-xs-1 pr-xs-2">
            <img className="avatar-48 border-radius-100" src={userImage}/>
            <div className="d-flex-column j-c-start align-items-start">
                <p className="fsize-xs-1 f-w-600">{users}</p>
                <p className="fsize-xs-0 f-w-200">{type}</p>
            </div>
            <div className='d-flex-row '>
                <img className='avatar-48 border-radius-02' src={img2} />
            </div>
        </div>
        
        </ContainerDefault>
        
    </div>

    ) : (
        <div className="d-flex-row j-c-start align-items-center bg-dark-soft w-100vw">
            <div className='pl-xs-2'>
                <div className='avatar-6 bg-red-300 border-radius-100'></div>
            </div>
        <ContainerDefault>
        <div className="d-flex-row align-items-center j-c-space-between pt-xs-1 pb-xs-1 pr-xs-2">
            <img className="avatar-48 border-radius-100" src={userImage}/>
            <div className="d-flex-column j-c-start align-items-start">
                <p className="fsize-xs-1 f-w-600">{users}</p>
                <p className="fsize-xs-0 f-w-200">{type}</p>
            </div>
            <div className='d-flex-row '>
                <img className='avatar-48 border-radius-02' src={img2} />
            </div>
        </div>
        
        </ContainerDefault>
        
    </div>

    )}
    </>
    
    
  )
}

export default Notification