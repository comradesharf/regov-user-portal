import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useMutation } from "@tanstack/react-query";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function useSignInWithGoogle() {
    return useMutation({
        mutationFn: async () => {
            const app = createFirebaseApp();
            const auth = getAuth(app);
            await signInWithRedirect(auth, new GoogleAuthProvider());
        },
    });
}
