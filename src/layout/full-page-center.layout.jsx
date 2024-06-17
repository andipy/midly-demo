const FullPageCenter = ({ children }) => {
    return (
        <div className='position-fixed top-0 w-100vw h-100vh z-index-1 d-flex-column align-items-center j-c-center'>
            {children}
        </div>
    )
}

export default FullPageCenter