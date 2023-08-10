import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, wide = false }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-800">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            <div className={"w-full mt-6 " + (wide ? 'sm:max-w-5xl': 'sm:max-w-md')+ " px-6 py-4 bg-white dark:bg-gray-700 shadow-md overflow-hidden sm:rounded-lg"}>
                {children}
            </div>
        </div>
    );
}
