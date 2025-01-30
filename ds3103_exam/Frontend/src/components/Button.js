const ButtonVariants = {
    Primary: "bg-blue-500 hover:bg-blue-400",
    Danger: "bg-red-500 hover:bg-red-400"
}

const Button = ({ type, onClick, text, variant = "Primary", className = "" }) => {

    return (
        <button className={`rounded p-2 ${ButtonVariants[variant]} ${className}`}
            type={type}
            onClick={onClick}
        >{text}</button>
    )
}

export default Button;