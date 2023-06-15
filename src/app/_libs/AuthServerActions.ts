import { createFirebaseApp } from "#root/_libs/FirebaseAdminUtils";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function verifySessionCookie(idToken: string) {
    const app = createFirebaseApp();

    const decodedIdToken = await getAuth(app).verifySessionCookie(idToken, true);

    if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 5 * 60) {
        throw new Error("token expired");
    }

    return decodedIdToken;
}

export async function decodeSessionCookie() {
    const session = cookies().get("session");

    if (!session?.value) return;

    try {
        return await verifySessionCookie(session.value);
    } catch (e) {
        console.error(e);
        return;
    }
}

export async function createCustomToken(uid: string) {
    const app = createFirebaseApp();
    return await getAuth(app).createCustomToken(uid);
}

export async function verifyIdToken(idToken: string) {
    const app = createFirebaseApp();
    const decodedIdToken = await getAuth(app).verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 5 * 60) {
        return;
    }

    return decodedIdToken;
}

export async function createSessionCookie(idToken: string, expiresIn: number) {
    const app = createFirebaseApp();
    return await getAuth(app).createSessionCookie(idToken, {
        expiresIn,
    });
}
