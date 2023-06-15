import * as AuthServerActions from "#root/_libs/AuthServerActions";
import cn from "#root/_libs/cn";
import * as UserInformationServerActions from "#root/_libs/UserInformationServerActions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

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

    if (!userInformation.isAdmin) {
        notFound();
    }

    const allUserInformationSnapshot = await UserInformationServerActions.getAllUserInformation();

    return (
        <div className={cn("prose", "mx-auto", "h-[60vh]", "max-w-6xl", "px-3")}>
            <h2>Registered Users</h2>
            <p>List of registered users</p>

            <div className={cn("overflow-x-auto")}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUserInformationSnapshot.docs.map((doc) => (
                            <Link key={doc.id} href={`/users/${doc.id}`} legacyBehavior>
                                <tr className={cn("hover", "cursor-pointer")}>
                                    <th>{doc.id}</th>
                                    <td>{doc.data()!.fullName}</td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
