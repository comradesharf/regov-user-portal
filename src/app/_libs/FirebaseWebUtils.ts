import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { once } from "lodash-es";

export const createFirebaseApp = once(() => {
    if (getApps().length) return getApp();

    const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!);

    if (process.env.NODE_ENV === "production") {
        config.authDomain = location.hostname;
    }

    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    if (process.env.NODE_ENV === "development") {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectFirestoreEmulator(db, "localhost", 8080);
        connectStorageEmulator(storage, "localhost", 9199);
    }

    void setPersistence(auth, inMemoryPersistence);

    return app;
});
