import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { useQuery } from "@tanstack/react-query";
import { getBlob, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";

export type Options = {
    path: string;
};

export default function useSecureFileUrl({ path }: Options) {
    const query = useQuery({
        queryKey: ["SecureFileUrl", path],
        queryFn: async () => {
            const app = createFirebaseApp();
            const storage = getStorage(app);
            const blob = await getBlob(ref(storage, path));
            return URL.createObjectURL(blob);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        return () => {
            if (query.data) URL.revokeObjectURL(query.data);
        };
    }, [query.data]);

    return query;
}
