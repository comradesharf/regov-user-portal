import * as AuthServerActions from "#root/_libs/AuthServerActions";
import * as UserInformationServerActions from "#root/_libs/UserInformationServerActions";
import UserInformationWizard from "#root/users/edits/_components/UserInformationWizard";

export type PageProps = {};

export default async function Page({}: PageProps) {
    const session = await AuthServerActions.decodeSessionCookie();
    const userInformation = await UserInformationServerActions.getUserInformation(session!.uid);
    return <UserInformationWizard userInformation={userInformation.data()} user={session!} />;
}
