import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const PrivacyPolicyRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Informativa privacy Fan'} />
    <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
    </ContainerDefault>
    </>

  )
}

export default PrivacyPolicyRoute