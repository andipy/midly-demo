const SimpleSpinnerLoader = ({ place }) => {
    return (
        <div className={place ? place : 'loader'}></div>
    )
}

export default SimpleSpinnerLoader