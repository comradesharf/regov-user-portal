import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";

export type Options = {
    customToken: string;
};

export default function useSignInWithToken({ customToken }: Options) {
    useEffect(() => {
        const app = createFirebaseApp();
        const auth = getAuth(app);
        signInWithCustomToken(auth, customToken).catch((error) => {
            console.error(error);
        });
    }, [customToken]);
}
