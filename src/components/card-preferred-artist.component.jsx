const CardPreferredArtist = ({ artist, size, onClick, index}) => {


    return (
        <div className='mr-xs-2 d-flex-column j-c-center align-items-center' onClick={onClick}>
            <div className={` ${size === 'small' ? 'avatar-80':'avatar-96'} border-radius-100  bg-dark-gradient position-relative`}>
                {index && 
                <div className="position-absolute top-0 right-0 bg-black white border-radius-100 pl-xs-8 avatar-20 border-radius-100">
                    <p className="fsize-xs-1 f-w-300">{index+1}</p>
                </div>
                }
            {/* <div className='avatar-96 border-radius-100 overlay-card bg-dark-overlay-card z-index-1'></div> */}                
                <img className={` ${size === 'small' ? 'avatar-80':'avatar-96'} border-radius-100 object-fit-cover border-radius-06`} src={artist.image} alt='' />
            </div>
            <div className='d-flex-column z-index-2 no-shrink'>
                <h5 className={`${size === 'small' ? 'fsize-xs-1 f-w-300':'fsize-xs-2 f-w-500'} mb-xs-2  letter-spacing-1 no-shrink`} style={{ whiteSpace: 'nowrap' }}>
                {artist.artistName.length > 8 ? artist.artistName.slice(0, 8) + '...' : artist.artistName}
                </h5>
            </div>
        </div>
    )
}

export default CardPreferredArtist