import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const CookiePolicyArtistsRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Cookie Policy'} />
    <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
    </ContainerDefault>
    </>

  )
}

export default CookiePolicyArtistsRoute