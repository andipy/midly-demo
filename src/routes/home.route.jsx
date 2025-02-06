import NavbarDefault from "../components/navbar-default.component"
import Container from "../layout/container.layout"
import Appbar from "../components/appbar.component"
const HomeRoute = () => {
  return (
    <>
    <NavbarDefault />
    <Container style={'pb-xs-appbar'}>

    </Container>
    <Appbar />
    </>
  )
}

export default HomeRoute