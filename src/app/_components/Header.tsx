"use client";

import useSignOut from "#root/_hooks/useSignOut";
import useUser from "#root/_hooks/useUser";
import cn from "#root/_libs/cn";
import Link from "next/link";

export type HeaderProps = {};

export default function Header({}: HeaderProps) {
    const user = useUser();

    const signOut = useSignOut();

    return (
        <div className={cn("navbar", "bg-neutral", "text-neutral-content")}>
            <div className={cn("px-4", "flex", "justify-between", "grow", "max-w-6xl", "mx-auto")}>
                <Link href="/">Portal</Link>
                {user ? (
                    <button
                        className={cn("btn", "btn-primary", "btn-sm")}
                        onClick={() => signOut.mutate()}
                        disabled={signOut.isLoading}
                    >
                        Sign Out
                    </button>
                ) : (
                    <Link href="/sign-in" className={cn("btn", "btn-primary", "btn-sm")}>
                        Launch
                    </Link>
                )}
            </div>
        </div>
    );
}
