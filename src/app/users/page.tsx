import * as AuthServerActions from "#root/_libs/AuthServerActions";
import cn from "#root/_libs/cn";
import * as UserInformationServerActions from "#root/_libs/UserInformationServerActions";
import Link from "next/link";
import { redirect } from "next/navigation";

export type PageProps = {};

export default async function Page({}: PageProps) {
    const session = await AuthServerActions.decodeSessionCookie();

    const userInformationSnapshot = await UserInformationServerActions.getUserInformation(
        session!.uid
    );

    if (!userInformationSnapshot.exists) {
        redirect("/users/edits");
    }

    const userInformation = userInformationSnapshot.data()!;

    return (
        <div className={cn("prose", "mx-auto", "h-[60vh]", "max-w-6xl", "pt-5", "px-10")}>
            <h2>Welcome, {userInformation.fullName}!</h2>
            <p>You have registered with us.</p>

            <div className={cn("flex", "gap-1", "flex-wrap")}>
                <Link
                    href={`/users/${session?.uid}`}
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
        </div>
    );
}
