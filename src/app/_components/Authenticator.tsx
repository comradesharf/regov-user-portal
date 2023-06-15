"use client";

import useSignInWithToken from "#root/_hooks/useSignInWithToken";
import { PropsWithChildren } from "react";

export type AuthenticatorProps = PropsWithChildren<{
    customToken: string;
}>;

export default function Authenticator({ customToken, children }: AuthenticatorProps) {
    useSignInWithToken({ customToken });
    return <>{children}</>;
}
