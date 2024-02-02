import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'

const CoverArtistPage = ({ artName, image }) => {
    return (
        <header class="position-relative h-xs-20">
            <img class="w-100 h-inherit object-fit-cover" src={image} />

            <div class="container w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row align-items-center">
                <div class="position-relative avatar-72">
                    <img class="avatar-72 border-radius-100 border-dark-6" src={image} />                       
                    <img class="artist-avatar-verified-icon" src={IconVerifiedArtist} />
                </div>
                <div class="d-flex-column no-shrink j-c-start ml-xs-4">
                    <h5 class="fsize-xs-4 f-w-600">{artName}</h5>
                </div>                    
            </div>                
        </header>
    )
}

export default CoverArtistPage;