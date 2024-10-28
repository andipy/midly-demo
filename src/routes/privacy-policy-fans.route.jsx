import ContainerDefault from '../layout/container-default.layout'
import Appbar from "../components/appbar.component";
import NavbarProfileSettings from "../components/navbar-profile-settings-component";

function PrivacyPolicy() {
  return (
    <>
    <NavbarProfileSettings title={'Informativa privacy Fan'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default PrivacyPolicy