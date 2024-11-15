const CommentsModalLayout = ({ children, modalOpen }) => {

    return (
        <div className={`position-fixed h-80vh bg-dark-soft w-100 full-screen-modal overflow-scroll left-0 ${modalOpen ? 'slide-up' : 'slide-down'}`}>
            {children}
        </div>
    )
}

export default CommentsModalLayout