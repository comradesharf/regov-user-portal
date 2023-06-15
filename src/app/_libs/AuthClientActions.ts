import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import * as Schemas from "#root/_libs/Schemas";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function signUpWithEmail(email: string, password: string) {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const response = await fetch("/auth/callback", {
        method: "POST",
        body: await user.getIdToken(),
    });
    if (!response.ok) {
        const error = new Error();
        error.code = "auth/invalid";
        throw error;
    }
}

export async function signInWithEmail(email: string, password: string) {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const response = await fetch("/auth/callback", {
        method: "POST",
        body: await user.getIdToken(),
    });
    if (!response.ok) {
        const error = new Error();
        error.code = "auth/invalid";
        throw error;
    }
}

export async function validateEmail(email: string) {
    const response = await fetch("/api/users/emails", {
        body: JSON.stringify({ email }),
        method: "POST",
    });

    if (!response.ok) {
        return;
    }

    return Schemas.EmailValidationResponse.parse(await response.json());
}
