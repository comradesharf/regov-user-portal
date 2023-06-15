import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function useSignOut() {
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            const app = createFirebaseApp();
            const auth = getAuth(app);
            await signOut(auth);

            const response = await fetch("/auth/callback", {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = new Error();
                error.code = "auth/invalid";
                throw error;
            }

            router.refresh();
        },
    });
}
