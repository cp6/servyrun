import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Head, usePage} from '@inertiajs/inertia-react';

export default function Edit({auth, mustVerifyEmail, status}) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit profile</h2>}
        >
            <Head title={user.name + ' profile'}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-700 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-6xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-700 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-6xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-700 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
