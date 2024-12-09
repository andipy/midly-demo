import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const PrivacyPolicyArtistsRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Informativa privacy Artisti'} />
    <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
    </ContainerDefault>
    </>

  )
}

export default PrivacyPolicyArtistsRoute