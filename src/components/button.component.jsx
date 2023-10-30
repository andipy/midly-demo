const Button = ({label, style, disabled}) => {
    return (
        <button className={style} disabled={disabled}>
            <span className="fsize-xs-3 f-w-400 white letter-spacing-1">{label}</span>
        </button>
    )
}

export default Button;