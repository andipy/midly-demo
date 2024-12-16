import Container from '../layout/container.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const CookiePolicyRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Cookie Policy'} />
    <Container style={'pt-xs-topbar pb-xs-appbar'}>
    </Container>
    </>

  )
}

export default CookiePolicyRoute