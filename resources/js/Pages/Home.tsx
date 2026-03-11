import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Home({ auth }: PageProps) {
    return (
        <GuestLayout>
            <Head title="Home" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                        Kabul Tenders
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Your trusted platform for accessing tender opportunities
                        in Afghanistan.
                    </p>

                    {!auth.user ? (
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                href={route("login")}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register.member")}
                                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Register as Member
                            </Link>
                            <Link
                                href={route("register.buyer")}
                                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Register as Buyer
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-10">
                            <Link
                                href={route("dashboard")}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
