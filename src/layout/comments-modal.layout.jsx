const CommentsModalLayout = ({ children, modalOpen }) => {


    return (
        <div className={`position-fixed h-80vh bg-dark-soft w-100 border-radius-top-08 z-index-1100 overflow-scroll left-0 ${modalOpen ? 'slide-up' : 'slide-down'}`}>
            {children}
        </div>
    )
}

export default CommentsModalLayout