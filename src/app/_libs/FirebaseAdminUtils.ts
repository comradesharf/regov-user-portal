import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { once } from "lodash-es";

export const createFirebaseApp = once(() => {
    if (getApps().length) return getApp();

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

    return initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount?.projectId,
    });
});
