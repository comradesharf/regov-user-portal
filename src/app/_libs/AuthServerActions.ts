import { createFirebaseApp } from "#root/_libs/FirebaseAdminUtils";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function verifySessionCookie(idToken: string) {
    const app = createFirebaseApp();
    return await getAuth(app).verifySessionCookie(idToken, true);
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
