import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useSyncExternalStore } from "react";

export type Options = {
    required?: boolean;
};

export default function useUser({ required }: Options = {}) {
    const user = useSyncExternalStore(
        (onStoreChange) => () => {
            const app = createFirebaseApp();
            const auth = getAuth(app);
            onAuthStateChanged(auth, onStoreChange);
        },
        () => {
            const app = createFirebaseApp();
            const auth = getAuth(app);
            return auth.currentUser;
        },
        () => undefined
    );

    const router = useRouter();

    useEffect(() => {
        if (!required) return;

        if (user === undefined) return;

        if (user) return;

        router.push("/sign-in");
    }, [router, user, required]);

    return useDeferredValue(user);
}
