const Button = ({label, style, disabled}) => {
    return (
        <button className={style} disabled={disabled}>
            <span className="fsize-xs-3 f-w-500">{label}</span>
        </button>
    )
}

export default Button;