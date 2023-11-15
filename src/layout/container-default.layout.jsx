const ContainerDefault = ({children, containerSpecificStyle}) => {
    return (
        <div className={`container ${containerSpecificStyle}`}>{children}</div>
    )
}

export default ContainerDefault;