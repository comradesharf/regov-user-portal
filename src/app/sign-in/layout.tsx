import * as AuthServerActions from "#root/_libs/AuthServerActions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
    const session = await AuthServerActions.decodeSessionCookie();

    if (session) {
        redirect("/users");
    }

    return <>{children}</>;
}
