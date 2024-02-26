import { useLocation } from 'react-router-dom'

import Button from './button.component'

import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'

const CoverArtistPage = ({ artName, image, flashLeaderboard, userCompeting, handleCompete }) => {

    const location = useLocation()
    
    return (
        <header className={`position-relative h-xs-20 ${location.pathname.includes('leaderboard-flash') ? 'position-fixed w-100 z-index-5 top-0' : ''}`}>
            <img className="w-100 h-inherit object-fit-cover" src={image} />

            {!location.pathname.includes('leaderboard-flash') &&
                <div className={`container w-100 position-absolute-x bottom-avatar-header z-index-2 d-flex-row ${userCompeting ? 'align-items-end' : 'align-items-center'}`}>
                    <div className="position-relative avatar-72">
                        <img className={`avatar-72 border-radius-100 ${flashLeaderboard & !location.pathname.includes('arctic-monkeys') ? 'border-red-6' : 'border-dark-6'}`} src={image} />                       
                        <img className="artist-avatar-verified-icon" src={IconVerifiedArtist} />
                    </div>
                    <div className="d-flex-column grow-1 no-shrink j-c-start ml-xs-2">
                        <h5 className="fsize-xs-4 f-w-600">{artName}</h5>
                        {userCompeting &&
                            <Button style={'bg-dark-soft-2 border-radius-04 grey-300 mt-xs-2 pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 align-self-start w-auto'} label={'Esci dalla classifica'} onClick={handleCompete} />
                        }
                    </div>                    
                </div>
            }              
        </header>
    )
}

export default CoverArtistPage;