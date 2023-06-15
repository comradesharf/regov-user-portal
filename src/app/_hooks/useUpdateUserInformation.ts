import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import * as Schemas from "#root/_libs/Schemas";
import { useMutation } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export type Options = {
    user: Pick<User, "uid">;
};

export default function useUpdateUserInformation({ user }: Options) {
    return useMutation({
        mutationFn: async (value: Schemas.UserInformationType) => {
            const app = createFirebaseApp();
            const db = getFirestore(app);
            await setDoc(
                doc(db, "users", user.uid).withConverter({
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
