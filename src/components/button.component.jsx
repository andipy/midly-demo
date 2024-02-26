const Button = ({label, style, disabled, onClick}) => {
    return (
        <button className={style} disabled={disabled} onClick={onClick}>
            <span>{label}</span>
        </button>
    )
}

export default Button;