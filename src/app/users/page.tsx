"use client";

import Loader from "#root/_components/Loader";
import useUser from "#root/_hooks/useUser";
import cn from "#root/_libs/cn";

export type PageProps = {};

export default function Page({}: PageProps) {
    const user = useUser({ required: true });

    if (user === undefined) {
        return (
            <div className={cn("h-[60vh]", "flex", "items-center", "justify-center")}>
                <Loader />
            </div>
        );
    }

    return null;
}
