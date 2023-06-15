import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import * as Schemas from "#root/_libs/Schemas";
import { useMutation } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default function useUpdateUserInformation() {
    return useMutation({
        mutationFn: async (value: Schemas.UserInformationType) => {
            const app = createFirebaseApp();
            const db = getFirestore(app);
            const auth = getAuth(app);

            await setDoc(
                doc(db, "users", auth.currentUser!.uid).withConverter({
                    fromFirestore(snapshot) {
                        return Schemas.UserInformation.parse(snapshot.data());
                    },
                    toFirestore(modelObject) {
                        return modelObject;
                    },
                }),
                value,
                { merge: true }
            );
        },
    });
}
