export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ` + className}>
            {value ? value : children}
        </label>
    );
}
