import Authenticator from "#root/_components/Authenticator";
import * as AuthServerActions from "#root/_libs/AuthServerActions";
import Breadcrumbs from "#root/users/_components/Breadcrumbs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
    const session = await AuthServerActions.decodeSessionCookie();

    if (!session) {
        redirect("/sign-in");
    }

    const customToken = await AuthServerActions.createCustomToken(session.uid);

    return (
        <Authenticator customToken={customToken}>
            <Breadcrumbs />
            {children}
        </Authenticator>
    );
}
