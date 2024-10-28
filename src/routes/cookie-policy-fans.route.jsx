import ContainerDefault from '../layout/container-default.layout'
import Appbar from "../components/appbar.component";
import NavbarProfileSettings from "../components/navbar-profile-settings-component";

function CookiePolicy() {
  return (
    <>
    <NavbarProfileSettings title={'Cookie Policy'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default CookiePolicy