import useUser from "#root/_hooks/useUser";
import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useQuery } from "@tanstack/react-query";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";

export default function useAuthenticateUser() {
    const user = useUser();

    const router = useRouter();

    const { isFetching } = useQuery({
        queryKey: ["RedirectResult", user] as const,
        queryFn: async () => {
            const app = createFirebaseApp();

            const auth = getAuth(app);

            if (user) {
                router.push("/users");
                return null;
            }

            const result = await getRedirectResult(auth);

            if (!result) return null;

            router.push("/users");

            return null;
        },
    });

    return useDeferredValue(user === undefined || isFetching);
}
