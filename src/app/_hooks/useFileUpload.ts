import { createFirebaseApp } from "#root/_libs/FirebaseWebUtils";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref, StorageError, uploadBytesResumable, UploadTask } from "firebase/storage";
import { ChangeEvent, useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function upload(prefix: string, file: File) {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const id = doc(collection(db, "files")).id;

    return uploadBytesResumable(ref(storage, `${prefix}/${id}`), file, {
        contentType: file.type,
        customMetadata: {
            originalName: file.name,
        },
    });
}

export type Options = {
    prefix?: string;
    accept?: string;
    id?: string;
    completeFn?: (task: UploadTask) => void;
    errorFn?: (error: StorageError) => void;
};

export default function useFileUpload({ prefix = "", accept, id, completeFn, errorFn }: Options) {
    const [task, setTask] = useState<ReturnType<typeof upload> | null>(null);

    useEffect(() => {
        if (!task) return;

        task.on(
            "state_changed",
            undefined,
            (error) => {
                console.error("file upload failed", error);
                errorFn?.(error);
            },
            () => {
                completeFn?.(task);
            }
        );
        return () => {
            task.cancel();
        };
    }, [task, errorFn, completeFn]);

    const progress = useSyncExternalStore(
        (onStoreChange) => () => task?.on("state_changed", onStoreChange),
        () => {
            if (!task) return 0;
            return (task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100;
        }
    );

    const state = useSyncExternalStore(
        (onStoreChange) => () =>
            task?.on("state_changed", onStoreChange, onStoreChange, onStoreChange),
        () => task?.snapshot?.state
    );

    const onChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            setTask(upload(prefix, file));
        },
        [prefix]
    );

    return {
        task,
        progress,
        state,
        inputProps: {
            onChange,
            accept,
            type: "file",
            id,
        },
    };
}
