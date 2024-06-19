const CommentModalLayout = ({ children, commentsOpen }) => {

    return (
        <div className={`position-fixed bottom-hidden h-80vh bg-dark-soft w-100 full-screen-modal ${commentsOpen ? 'slide-up' : 'slide-down'}`}>{children}</div>
    )
}

export default CommentModalLayout