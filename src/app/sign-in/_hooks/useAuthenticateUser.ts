import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useQuery } from "@tanstack/react-query";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";

export default function useAuthenticateUser() {
    const router = useRouter();

    const { isFetching } = useQuery({
        queryKey: ["RedirectResult"] as const,
        queryFn: async () => {
            const app = createFirebaseApp();
            const auth = getAuth(app);
            const result = await getRedirectResult(auth);

            if (!result) return null;

            const { user } = result;

            const response = await fetch("/auth/callback", {
                method: "POST",
                body: await user.getIdToken(),
            });

            if (!response.ok) {
                const error = new Error();
                error.code = "auth/invalid";
                throw error;
            }

            router.refresh();

            return null;
        },
    });

    return useDeferredValue(isFetching);
}
