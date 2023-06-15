import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useMutation } from "@tanstack/react-query";
import { deleteObject, getStorage, ref } from "firebase/storage";

export type Options = {
    path: string;
};

export default function useDeleteFile({ path }: Options) {
    return useMutation({
        mutationFn: async () => {
            const app = createFirebaseApp();
            const storage = getStorage(app);
            await deleteObject(ref(storage, path));
        },
    });
}
