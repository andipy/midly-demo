const SimpleSpinnerLoader = ({ size }) => {
    return (
        <div className={size ? size : 'loader'}></div>
    )
}

export default SimpleSpinnerLoader