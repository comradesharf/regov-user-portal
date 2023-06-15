import { createFirebaseApp } from "#root/_libs/FirebaseAdminUtils";
import * as Schemas from "#root/_libs/Schemas";
import { getFirestore } from "firebase-admin/firestore";

export async function getUserInformation(uid: string) {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    return await db
        .doc(`users/${uid}`)
        .withConverter({
            fromFirestore(snapshot) {
                return Schemas.UserInformation.parse(snapshot.data());
            },
            toFirestore(modelObject) {
                return modelObject;
            },
        })
        .get();
}

export async function getAllUserInformation() {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    return await db
        .collection("users")
        .withConverter({
            fromFirestore(snapshot) {
                return Schemas.UserInformation.parse(snapshot.data());
            },
            toFirestore(modelObject) {
                return modelObject;
            },
        })
        .get();
}
