import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { once } from "lodash-es";

export const createFirebaseApp = once(() => {
    if (getApps().length) return getApp();

    const app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!));

    if (process.env.NODE_ENV !== "development") return app;

    connectAuthEmulator(getAuth(app), "http://localhost:9099");
    connectFirestoreEmulator(getFirestore(app), "localhost", 8080);
    connectStorageEmulator(getStorage(app), "localhost", 9199);

    return app;
});
