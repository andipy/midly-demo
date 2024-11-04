import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const TermsConditionsRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'Termini e condizioni Fan'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
      <div className='bg-white black'>

      </div>
    </ContainerDefault>
    
    </>

  )
}

export default TermsConditionsRoute