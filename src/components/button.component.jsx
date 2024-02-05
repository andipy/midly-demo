const Button = ({label, style, disabled, onClick}) => {
    return (
        <button className={style} disabled={disabled} onClick={onClick}>
            <span className="fsize-xs-3 f-w-500">{label}</span>
        </button>
    )
}

export default Button;