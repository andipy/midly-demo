const BadgeSpecialPreview = ({ badge, leaderboard }) => {
    return (
        <div className='d-flex-column j-c-space-between w-min-100 bg-dark-soft pt-xs-6 pb-xs-8 pl-xs-8 pr-xs-4 border-radius-1 gap-1em mr-xs-2 position-relative overflow-all-hidden'>
            <span className='fsize-xs-10 f-w-700 lime-400 line-height-1 z-index-2'>SUPER <br></br> FAN #{badge?.position}</span>
            
            <span className='f-w-300 grey-200 w-50 z-index-2'>della classifica FLASH {leaderboard?.song ? "sul brano" : leaderboard?.album && "sull'album"}</span>
            <span className='fsize-xs-6 f-w-600 white w-60 z-index-2'>{leaderboard?.song ? leaderboard.song.title : leaderboard?.album && leaderboard?.album.title}</span>

            <img className='position-absolute right-0 bottom-12 flash-badge-image-rotation w-45 z-index-1' src={badge?.image} />
        </div>
    )
}

export default BadgeSpecialPreview