"use client";

import useUpdateUserInformation from "#root/_hooks/useUpdateUserInformation";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type UserDashboardProps = {
    userInformation: Schemas.UserInformationType;
    user: { uid: string };
};

export default function UserDashboard({ userInformation, user }: UserDashboardProps) {
    const router = useRouter();

    const updateUserInformation = useUpdateUserInformation({ user });

    return (
        <div className={cn("prose", "mx-auto", "h-[60vh]", "max-w-6xl", "px-3")}>
            <h2>Welcome, {userInformation.fullName}!</h2>

            <p>You have registered with us.</p>

            <div className={cn("flex", "gap-1", "flex-wrap", "justify-center", "md:justify-start")}>
                <Link
                    href={`/users/${user.uid}`}
                    className={cn("btn", "btn-primary", "btn-sm", "btn-wide", "btn-outline")}
                >
                    View
                </Link>
                <Link
                    href="/users/edits"
                    className={cn("btn", "btn-primary", "btn-sm", "btn-wide")}
                >
                    Edit
                </Link>
            </div>

            <div className={cn("flex", "justify-end", "mt-10")}>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className={cn("label-text", "mr-2")}>Is Admin?</span>
                        <input
                            type="checkbox"
                            className={cn("toggle", "toggle-secondary")}
                            checked={userInformation.isAdmin}
                            onChange={async (event) => {
                                await updateUserInformation.mutateAsync({
                                    isAdmin: event.currentTarget.checked,
                                });
                                router.refresh();
                            }}
                            disabled={updateUserInformation.isLoading}
                        />
                    </label>
                </div>
            </div>

            {userInformation.isAdmin ? (
                <div className={cn("flex", "gap-1", "justify-center", "md:justify-start")}>
                    <Link
                        href="/users/list"
                        className={cn("btn", "btn-primary", "btn-sm", "btn-wide", "btn-outline")}
                    >
                        List
                    </Link>
                </div>
            ) : null}
        </div>
    );
}
