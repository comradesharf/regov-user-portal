import * as AuthServerActions from "#root/_libs/AuthServerActions";
import cn from "#root/_libs/cn";
import * as UserInformationServerActions from "#root/_libs/UserInformationServerActions";
import UserInformationPreview from "#root/users/_components/UserInformationPreview";
import { notFound } from "next/navigation";

export type PageProps = {
    params: { uid: string };
};

export default async function Page({ params: { uid } }: PageProps) {
    const session = await AuthServerActions.decodeSessionCookie();

    if (session!.uid !== uid) {
        notFound();
    }

    const userInformationSnapshot = await UserInformationServerActions.getUserInformation(uid);

    if (!userInformationSnapshot.exists) {
        notFound();
    }

    const userInformation = userInformationSnapshot.data();

    return (
        <div className={cn("mx-auto", "max-w-2xl", "prose")}>
            <h2>Submitted by {session!.uid === uid ? "you" : userInformation?.fullName}</h2>
            <UserInformationPreview userInformation={userInformation} />
        </div>
    );
}
