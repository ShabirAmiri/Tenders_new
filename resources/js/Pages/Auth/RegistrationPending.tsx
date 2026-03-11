import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function RegistrationPending() {
    return (
        <GuestLayout>
            <Head title="Registration Pending" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Registration Pending Approval
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Thank you for registering. Your account is pending
                        approval by an administrator. You will receive an email
                        once your account has been activated.
                    </p>
                    <Link
                        href={route("home")}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
