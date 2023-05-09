import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400 bg-slate-200 dark:bg-slate-600 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-gray-800 dark:text-gray-400 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-900 focus:bg-slate-400 focus:border-gray-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
