import { useNavigate } from 'react-router-dom'
import NavbarBackOnly from '../components/navbar-back-only.component'
import Container from '../layout/container.layout'
import Notification from '../components/notification.component'

const FanclubActivityRoute = () => {

    const navigate = useNavigate()
    
        const notifications = [
            {
                id: 0,
                postId: 1,
                date: '2024-12-09 10:00:00',
                type: 'LIKE',
                users: [
                {
                    id: 6,
                    userName: 'Giulietta',
                },
                {
                    id: 2,
                    userName: 'marco',
                },
                {
                    id: 3,
                    userName: 'username',
                },
                {
                    id: 4,
                    userName: 'dan',
                }
                ],
                read: false,
        
            }, {
                id: 0,
                postId: 1,
                date: '2024-11-09 10:00:00',
                type: 'REPLY',
                text: 'Sei caricooo?',
                users: [
                {
                    id: 2,
                    userName: 'marco',
                },
                ],
                read: true,
        
            }
        ]
  return (
        <>
        <NavbarBackOnly onClick={() => navigate(-1)} />

        <Container style={'mb-xs-4'}>
            <h4 className="fsize-xs-6 f-w-500">Attività</h4>
        </Container>

        <div id='notifications'>
            {notifications.map((notification, index) => (
                <Notification notification={notification} key={index} />
            ))}
        </div>
		</>
		
  )
}

export default FanclubActivityRoute