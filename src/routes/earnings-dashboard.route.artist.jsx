import { Outlet, useLocation, useNavigate } from 'react-router-dom'


import Navbar from '../components/navbar.component.artist'
import Container from '../layout/container.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'

const EarningsDashboard = () => {


    const location = useLocation()
    const navigate = useNavigate()

  return (
    <>
    <NavbarBackOnly onClick={() => navigate('/artist-app/profile')} />
    <Container style={'pb-xs-appbar'}>
        <div className='d-flex-row bg-dark-900'>                
            <div className='d-flex-column grow-1 align-items-center' onClick={() => navigate(`/artist-app/earnings-dashboard/lastMonth`)}>
                <span className={`${location.pathname.includes('lastMonth') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-2 mb-xs-2`}>Riscuoti</span>
                <span className={`${location.pathname.includes('lastMonth') ? 'bg-acid-lime' : 'bg-grey-500'} marker2`}></span>
            </div>
            <div className='d-flex-column grow-1 align-items-center' onClick={() => navigate(`/artist-app/earnings-dashboard/currentMonth`)}>
                <span className={`${location.pathname.includes('currentMonth') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-2 mb-xs-2`}>Questo mese</span>
                <span className={`${location.pathname.includes('currentMonth') ? 'bg-acid-lime' : 'bg-grey-500'} marker2`}></span>
            </div>
            <div className='d-flex-column grow-1 align-items-center' onClick={() => navigate(`/artist-app/earnings-dashboard/graph`)}>
                <span className={`${location.pathname.includes('graph') ? 'lime-400 f-w-600' : 'grey-300'} fsize-xs-2 mb-xs-2`}>Statistiche</span>
                <span className={`${location.pathname.includes('graph') ? 'bg-acid-lime' : 'bg-grey-500'} marker2`}></span>
            </div>
        </div> 
        <Outlet />
    </Container>

    </>
  )
}

export default EarningsDashboard