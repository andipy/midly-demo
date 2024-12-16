import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const CookiePolicyRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Cookie Policy'} />
    <ContainerDefault style={'pt-xs-topbar pb-xs-appbar'}>
    </ContainerDefault>
    </>

  )
}

export default CookiePolicyRoute