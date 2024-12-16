const ContainerDefault = ({children, style}) => {
    return (
        <div className={`container ${style}`}>{children}</div>
    )
}

export default ContainerDefault;