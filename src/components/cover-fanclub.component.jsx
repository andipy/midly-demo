const CoverFanclub = ({ fanclub }) => {
    return (
        <header className={`position-relative h-xs-25`}>
            <img
                className='w-100 h-inherit object-fit-cover'
                src={fanclub?.cover && fanclub.cover}
            />
        </header>
    )
}

export default CoverFanclub