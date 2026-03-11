import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Button } from "@/Components/ui/button";

interface Props {
    sectors: { id: number; name: string }[];
}

export default function RegisterMember({ sectors }: Props) {
    const [memberType, setMemberType] = useState<"public" | "acci">("public");

    const { data, setData, post, processing, errors, reset } = useForm({
        member_subtype: "public",
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        // ACCI fields
        gender: "",
        organization_name: "",
        contact_person: "",
        position: "",
        sector_id: "",
        membership_tier: "",
        membership_id: "",
        membership_issue_date: "",
        membership_expiry_date: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register.member"));
    };

    return (
        <GuestLayout>
            <Head title="Register as Member" />

            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Register as Member
                        </h2>

                        {/* Member Type Selector */}
                        <div className="mb-6 flex justify-center gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="public"
                                    checked={memberType === "public"}
                                    onChange={() => {
                                        setMemberType("public");
                                        setData("member_subtype", "public");
                                    }}
                                    className="form-radio"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                    Public Member (Pay for access)
                                </span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="acci"
                                    checked={memberType === "acci"}
                                    onChange={() => {
                                        setMemberType("acci");
                                        setData("member_subtype", "acci");
                                    }}
                                    className="form-radio"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                    ACCI Member
                                </span>
                            </label>
                        </div>

                        <form onSubmit={submit}>
                            {/* Common Fields */}
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Full Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setData("name", e.target.value)}
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setData("email", e.target.value)}
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="phone" value="Phone" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    autoComplete="tel"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setData("phone", e.target.value)}
                                    required
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            {/* ACCI-specific Fields */}
                            {memberType === "acci" && (
                                <>
                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="gender"
                                            value="Gender"
                                        />
                                        <SelectInput
                                            id="gender"
                                            name="gender"
                                            value={data.gender}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                setData(
                                                    "gender",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                            <option value="other">Other</option>
                                        </SelectInput>
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="organization_name"
                                            value="Organization Name"
                                        />
                                        <TextInput
                                            id="organization_name"
                                            type="text"
                                            name="organization_name"
                                            value={data.organization_name}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                setData(
                                                    "organization_name",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.organization_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="contact_person"
                                            value="Contact Person (if different)"
                                        />
                                        <TextInput
                                            id="contact_person"
                                            type="text"
                                            name="contact_person"
                                            value={data.contact_person}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                setData(
                                                    "contact_person",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.contact_person}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="position"
                                            value="Position/Job Title"
                                        />
                                        <TextInput
                                            id="position"
                                            type="text"
                                            name="position"
                                            value={data.position}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                setData(
                                                    "position",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.position}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="sector_id"
                                            value="Sector"
                                        />
                                        <SelectInput
                                            id="sector_id"
                                            name="sector_id"
                                            value={data.sector_id}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                setData(
                                                    "sector_id",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Sector
                                            </option>
                                            {sectors.map((sector) => (
                                                <option
                                                    key={sector.id}
                                                    value={sector.id}
                                                >
                                                    {sector.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.sector_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="membership_tier"
                                            value="ACCI Membership Type"
                                        />
                                        <SelectInput
                                            id="membership_tier"
                                            name="membership_tier"
                                            value={data.membership_tier}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                setData(
                                                    "membership_tier",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Type
                                            </option>
                                            <option value="VIP">VIP</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Platinum">
                                                Platinum
                                            </option>
                                            <option value="Entrepreneur">
                                                Entrepreneur
                                            </option>
                                        </SelectInput>
                                        <InputError
                                            message={errors.membership_tier}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="membership_id"
                                            value="ACCI Membership ID"
                                        />
                                        <TextInput
                                            id="membership_id"
                                            type="text"
                                            name="membership_id"
                                            value={data.membership_id}
                                            className="mt-1 block w-full"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                setData(
                                                    "membership_id",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.membership_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <InputLabel
                                                htmlFor="membership_issue_date"
                                                value="Issue Date"
                                            />
                                            <TextInput
                                                id="membership_issue_date"
                                                type="date"
                                                name="membership_issue_date"
                                                value={
                                                    data.membership_issue_date
                                                }
                                                className="mt-1 block w-full"
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    setData(
                                                        "membership_issue_date",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors.membership_issue_date
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <InputLabel
                                                htmlFor="membership_expiry_date"
                                                value="Expiry Date"
                                            />
                                            <TextInput
                                                id="membership_expiry_date"
                                                type="date"
                                                name="membership_expiry_date"
                                                value={
                                                    data.membership_expiry_date
                                                }
                                                className="mt-1 block w-full"
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    setData(
                                                        "membership_expiry_date",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors.membership_expiry_date
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Password Fields (common) */}
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setData("password", e.target.value)}
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
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

                            <div className="flex items-center justify-end mt-6">
                                <Link
                                    href={route("login")}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <Button
                                    type="submit"
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
