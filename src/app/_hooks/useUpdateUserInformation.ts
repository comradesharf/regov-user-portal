import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import * as Schemas from "#root/_libs/Schemas";
import { useMutation } from "@tanstack/react-query";
import { doc, getFirestore, UpdateData, updateDoc } from "firebase/firestore";

export type Options = {
    user: { uid: string };
};

export default function useUpdateUserInformation({ user }: Options) {
    return useMutation({
        mutationFn: async (value: UpdateData<Schemas.UserInformationType>) => {
            const app = createFirebaseApp();
            const db = getFirestore(app);
            await updateDoc(
                doc(db, "users", user.uid).withConverter({
                    fromFirestore(snapshot) {
                        return Schemas.UserInformation.parse(snapshot.data());
                    },
                    toFirestore(modelObject) {
                        return modelObject;
                    },
                }),
                value
            );
        },
    });
}
