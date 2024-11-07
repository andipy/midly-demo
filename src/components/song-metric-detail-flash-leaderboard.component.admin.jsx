const SongMetricDetailFlashLeaderboard = ({ index, songTitle, streamCount }) => {

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    }

    return (
        <div className='d-flex-col w-100'>
            {index > 0 && <hr />}
            <div className='d-flex-row w-100 j-c-space-between align-items-center mt-xs-2 mb-xs-2 gap-1em'>
                <p className='fsize-xs-0 grey-100 letter-spacing-1 grow-1'>{index}. {songTitle}</p>
                <p className='fsize-xs-2 f-w-500 grey-100 no-shrink'>{formatNumber(streamCount)}</p>
            </div>
        </div>
    )
}

export default SongMetricDetailFlashLeaderboard