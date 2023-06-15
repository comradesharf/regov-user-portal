import useUser from "#root/_hooks/useUser";
import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import * as Schemas from "#root/_libs/Schemas";
import { useQuery } from "@tanstack/react-query";
import { doc, FirestoreDataConverter, getDoc, getFirestore } from "firebase/firestore";

const Converter: FirestoreDataConverter<Schemas.UserInformationType> = {
    fromFirestore(snapshot) {
        return Schemas.UserInformation.parse(snapshot.data());
    },
    toFirestore(modelObject) {
        return modelObject;
    },
};

export default function useUserInformation() {
    const user = useUser();

    const uid = user?.uid;

    return useQuery({
        enabled: !!uid,
        queryKey: ["UserInformation", uid],
        queryFn: async () => {
            const app = createFirebaseApp();
            const db = getFirestore(app);
            return await getDoc(doc(db, "users", uid!).withConverter(Converter));
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}
