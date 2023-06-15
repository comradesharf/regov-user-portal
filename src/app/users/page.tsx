import * as AuthServerActions from "#root/_libs/AuthServerActions";
import * as UserInformationServerActions from "#root/_libs/UserInformationServerActions";
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

    return <div>User Information</div>;
}
