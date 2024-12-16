const CoverFanclub = ({ fanclub }) => {
    return (
        <header className={`position-relative h-xs-27`}>
            {fanclub?.cover.type === 'IMAGE' ?
                <img
                    className='w-100 h-inherit object-fit-cover'
                    src={fanclub?.cover.url && fanclub.cover.url}
                />
            : fanclub?.cover.type === 'VIDEO' &&
                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline>
                    <source src={fanclub?.cover.url && fanclub.cover.url} type='video/mp4' />
                </video>
            }
        </header>
    )
}

export default CoverFanclub