export default function StatCard({route, text = 'text', value = 123}) {
    return (
        <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-700">
            <a href={route} className="" tabIndex="0" role="link" title={'Go to ' + text}>
                <div className="py-5 text-center">
                    <p className="block text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{text}</span>
                </div>
            </a>
        </div>
    );
}
