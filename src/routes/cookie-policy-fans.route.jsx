import ContainerDefault from '../layout/container-default.layout'
import Appbar from '../components/appbar.component'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const CookiePolicyRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Cookie Policy'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default CookiePolicyRoute