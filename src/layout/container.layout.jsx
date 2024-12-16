const Container = ({children, style}) => {
    return (
        <div className={`container ${style}`}>{children}</div>
    )
}

export default Container