import Watch from "#root/_components/forms/Watch";
import useFileUpload from "#root/_hooks/useFileUpload";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import EmptyFileUpload from "#root/users/edits/_components/EmptyFileUpload";
import FilePreview from "#root/users/edits/_components/FilePreview";
import FileUploadInput from "#root/users/edits/_components/FileUploadInput";
import FileUploadProgress from "#root/users/edits/_components/FileUploadProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "firebase/auth";
import { UploadTask } from "firebase/storage";
import { useCallback, useDeferredValue } from "react";
import { useForm } from "react-hook-form";
import { useSwiper } from "swiper/react";

export type UserUploadFormProps = {
    user: Pick<User, "uid">;
    userInformation?: Schemas.UserInformationType;
    onUpdate: (value: Schemas.UserInformationType) => void;
};

export default function UserUploadForm({ userInformation, onUpdate, user }: UserUploadFormProps) {
    const form = useForm<Schemas.UserInformationType>({
        values: userInformation,
        resolver: zodResolver(Schemas.UserInformation),
    });

    const completeFn = useCallback(
        (task: UploadTask) => {
            form.setValue("passports", [
                task.snapshot.ref.fullPath,
                ...form.getValues("passports"),
            ]);
        },
        [form]
    );

    const deleteFn = useCallback(
        (path: string) => {
            form.setValue("passports", [
                ...form.getValues("passports").filter((value) => value !== path),
            ]);
        },
        [form]
    );

    const { inputProps, state, progress } = useFileUpload({
        prefix: `files/${user.uid}`,
        accept: "image/png,image/jpg,image/jpeg",
        id: "file-upload",
        completeFn,
    });

    const deferredState = useDeferredValue(state);

    const swiper = useSwiper();

    return (
        <div className={cn("card", "prose", "mx-auto", "max-w-2xl", "shadow-xl", "card-compact")}>
            <form className={cn("card-body")} noValidate>
                <h6 className={cn("card-title")}>Identity Card/Passport</h6>
                <Watch
                    name="passports"
                    control={form.control}
                    render={(passports) =>
                        passports?.length || deferredState === "running" ? (
                            <div
                                className={cn("rounded-2xl", "min-h-[400px]", "bg-gray-100", "p-2")}
                            >
                                <div
                                    className={cn(
                                        "grid",
                                        "sm:grid-cols-5",
                                        "grid-cols-2",
                                        "gap-y-2"
                                    )}
                                >
                                    {passports.map((passport) => (
                                        <FilePreview
                                            path={passport}
                                            key={passport}
                                            onDelete={deleteFn}
                                        />
                                    ))}
                                    {deferredState === "running" ? (
                                        <FileUploadProgress progress={progress} />
                                    ) : (
                                        <FileUploadInput inputProps={inputProps} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <EmptyFileUpload inputProps={inputProps} />
                        )
                    }
                />
                <div className={cn("card-actions", "justify-end")}>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary", "btn-outline")}
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(async (value) => {
                            onUpdate(value);
                            swiper.slidePrev();
                        })}
                    >
                        Back
                    </button>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary")}
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(async (value) => {
                            onUpdate(value);
                            swiper.slideNext();
                        })}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}
