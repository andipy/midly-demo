const FullPageCenter = ({ children, style }) => {
    return (
        <div className={`position-fixed top-0 right-0 left-0 w-100 h-100 d-flex-column align-items-center j-c-center ${style ? style : ''}`}>
            {children}
        </div>
    )
}

export default FullPageCenter