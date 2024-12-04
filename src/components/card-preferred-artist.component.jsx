const CardPreferredArtist = ({ artist, size, onClick}) => {


    return (
        <div className='mr-xs-2 d-flex-column j-c-center align-items-center' onClick={onClick}>
            <div className={` ${size === 'small' ? 'avatar-56':'avatar-96'} border-radius-100  bg-dark-gradient position-relative`}>
            {/* <div className='avatar-96 border-radius-100 overlay-card bg-dark-overlay-card z-index-1'></div> */}                
                <img className={` ${size === 'small' ? 'avatar-56':'avatar-96'} border-radius-100 object-fit-cover border-radius-06`} src={artist.image} alt='' />
            </div>
            <div className='d-flex-column z-index-2 no-shrink'>
                <h5 className={`${size === 'small' ? 'fsize-xs-1':'fsize-xs-2'} mb-xs-2 f-w-500 letter-spacing-1 no-shrink`} style={{ whiteSpace: 'nowrap' }}>{artist.artistName}</h5>
            </div>
        </div>
    )
}

export default CardPreferredArtist