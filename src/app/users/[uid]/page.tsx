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

    const [sessionUserInformationSnapshot, currentUserInformationSnapshot] = await Promise.all([
        UserInformationServerActions.getUserInformation(session!.uid),
        UserInformationServerActions.getUserInformation(uid),
    ]);

    if (!currentUserInformationSnapshot.exists || !sessionUserInformationSnapshot.exists) {
        notFound();
    }

    const currentUserInformation = currentUserInformationSnapshot.data()!;

    const sessionUserInformation = sessionUserInformationSnapshot.data()!;

    if (!sessionUserInformation!.isAdmin && session!.uid !== uid) {
        notFound();
    }

    return (
        <div className={cn("mx-auto", "max-w-2xl", "prose")}>
            <h2>Submitted by {session!.uid === uid ? "you" : currentUserInformation?.fullName}</h2>
            <UserInformationPreview userInformation={currentUserInformation} />
        </div>
    );
}
