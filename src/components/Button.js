import './styles.scss'


const Button = ({name, onClick, disabled}) => {
    return (
        <button onClick={onClick} className="my-btn" disabled={disabled}>
            {name}
        </button>
    )
}
export default Button;