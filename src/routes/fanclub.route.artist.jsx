import Appbar from "../components/appbar.component.artist"
import Button from "../components/button.component"
import Navbar from "../components/navbar.component.artist"
import ContainerDefault from "../layout/container-default.layout"
import FullPageEmptyState from "../layout/full-page-empty-state.layout"

const FanclubRoute = () => {
    return (
        <>
            <Navbar />

            <FullPageEmptyState>
                <ContainerDefault containerSpecificStyle="d-flex-column align-items-center j-c-center gap-1em">
                    <div className="avatar-36 bg-red-300"></div>
                    <p>Apri il tuo fanclub</p>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Configura' />
                </ContainerDefault>
            </FullPageEmptyState>

            <Appbar />
        </>
    )
}

export default FanclubRoute