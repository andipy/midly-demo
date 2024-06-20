const CommentsModalLayout = ({ children, commentsOpen }) => {

    return (
        <div className={`position-fixed h-80vh bg-dark-soft w-100 full-screen-modal overflow-scroll ${commentsOpen ? 'slide-up' : 'slide-down'}`}>{children}</div>
    )
}

export default CommentsModalLayout