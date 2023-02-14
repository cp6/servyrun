export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 hover:dark:bg-purple-800 focus:bg-gray-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
