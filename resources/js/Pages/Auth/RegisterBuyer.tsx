import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterBuyer() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        organization_name: "",
        organization_type: "",
        contact_person: "",
        phone: "",
        address: "",
        tax_id: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register.buyer"));
    };

    return (
        <GuestLayout>
            <Head title="Register as Buyer" />

            <form onSubmit={submit}>
                {/* Organization Information */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="organization_name"
                            value="Organization Name *"
                        />
                        <TextInput
                            id="organization_name"
                            name="organization_name"
                            value={data.organization_name}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("organization_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.organization_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="organization_type"
                            value="Organization Type *"
                        />
                        <select
                            id="organization_type"
                            name="organization_type"
                            value={data.organization_type}
                            onChange={(e) =>
                                setData("organization_type", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="UN">UN</option>
                            <option value="NGO">NGO</option>
                            <option value="Government">Government</option>
                            <option value="Private">Private Company</option>
                            <option value="Other">Other</option>
                        </select>
                        <InputError
                            message={errors.organization_type}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="contact_person"
                            value="Contact Person *"
                        />
                        <TextInput
                            id="contact_person"
                            name="contact_person"
                            value={data.contact_person}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("contact_person", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.contact_person}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone *" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="sm:col-span-2">
                        <InputLabel htmlFor="address" value="Address *" />
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("address", e.target.value)}
                            required
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="tax_id"
                            value="Tax ID (optional)"
                        />
                        <TextInput
                            id="tax_id"
                            name="tax_id"
                            value={data.tax_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("tax_id", e.target.value)}
                        />
                        <InputError message={errors.tax_id} className="mt-2" />
                    </div>
                </div>

                {/* User Account Information */}
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Account Information
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        This will be used to log in.
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name *" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email *" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password *" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password *"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register as Buyer
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
