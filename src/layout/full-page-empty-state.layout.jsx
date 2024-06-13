const FullPageEmptyState = ({ children }) => {
    return (
        <div className='position-fixed w-100vw h-100vh z-index-1 d-flex-column align-items-center j-c-center'>
            {children}
        </div>
    )
}

export default FullPageEmptyState