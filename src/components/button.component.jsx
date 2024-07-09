const Button = ({label, style, disabled, onClick, children}) => {
    return (
        <button className={style} disabled={disabled} onClick={onClick}>
            {children}
            <span>{label}</span>
        </button>
    )
}

export default Button;