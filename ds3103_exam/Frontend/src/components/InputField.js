const InputField = ({ title, type, placeholder, value, onChange }) => {

    return (
        <div className="flex flex-col">
            <label className="pt-10"> {title}</label>
            <input className="border rounded p-2"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
export default InputField;