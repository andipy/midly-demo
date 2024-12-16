import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const TermsConditionsRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Termini e condizioni Fan'} />
    <ContainerDefault style={'pt-xs-topbar pb-xs-appbar'}>
      <div className='bg-white black'>

      </div>
    </ContainerDefault>
    </>

  )
}

export default TermsConditionsRoute