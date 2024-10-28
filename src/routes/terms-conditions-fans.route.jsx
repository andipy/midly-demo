import ContainerDefault from '../layout/container-default.layout'
import Appbar from "../components/appbar.component";
import NavbarProfileSettings from "../components/navbar-profile-settings-component";

function TermsConditions() {
  return (
    <>
    <NavbarProfileSettings title={'Termini e condizioni fan'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default TermsConditions