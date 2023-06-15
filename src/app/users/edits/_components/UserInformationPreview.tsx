import useToast from "#root/_hooks/useToast";
import useUpdateUserInformation from "#root/_hooks/useUpdateUserInformation";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import FilePreview from "#root/users/edits/_components/FilePreview";
import { useRouter } from "next/navigation";
import { useSwiper } from "swiper/react";

export type UserInformationPreviewProps = {
    userInformation?: Schemas.UserInformationType;
};

export default function UserInformationPreview({ userInformation }: UserInformationPreviewProps) {
    const swiper = useSwiper();

    const updateUserInformation = useUpdateUserInformation();

    const router = useRouter();

    const { toast, showToast } = useToast();

    return (
        <div className={cn("card", "mx-auto", "max-w-2xl", "shadow-xl", "card-compact")}>
            <article className={cn("card-body", "prose")}>
                <h6 className={cn("card-title")}>Review Submission</h6>

                <div>
                    <h4>Full Name</h4>
                    <p className={cn("m-0")}>{userInformation?.fullName}</p>
                </div>

                <div>
                    <h4>Age</h4>
                    <p className={cn("m-0")}>{userInformation?.age}</p>
                </div>

                <div>
                    <h4>Address</h4>
                    <p className={cn("m-0", "whitespace-pre-line")}>{userInformation?.address}</p>
                </div>

                <div>
                    <h4>Job</h4>
                    <p className={cn("m-0")}>{userInformation?.job}</p>
                </div>

                <div>
                    <h4>Identity Card/Passport</h4>
                    {userInformation?.passports?.length ? (
                        <div className={cn("rounded-2xl", "min-h-[400px]", "bg-gray-100", "p-2")}>
                            <div className={cn("grid", "grid-cols-2", "sm:grid-cols-5", "gap-y-2")}>
                                {userInformation.passports.map((passport) => (
                                    <FilePreview path={passport} key={passport} readonly />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "flex",
                                "items-center",
                                "justify-center",
                                "rounded-xl",
                                "min-h-[400px]",
                                "bg-gray-100",
                                "flex-col",
                                "p-10"
                            )}
                        >
                            <h5>No Identity Card/Passport</h5>
                            <span
                                className={cn(
                                    "text-gray-400",
                                    "text-xs",
                                    "text-center",
                                    "block",
                                    "mb-10"
                                )}
                            >
                                Your uploaded identity card/passport will be listed here
                            </span>
                        </div>
                    )}
                </div>

                <div className={cn("card-actions", "justify-end")}>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary", "btn-outline")}
                        onClick={() => swiper.slidePrev()}
                        disabled={updateUserInformation.isLoading}
                    >
                        Back
                    </button>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary")}
                        disabled={updateUserInformation.isLoading}
                        onClick={async () => {
                            if (!userInformation) return;
                            await updateUserInformation.mutateAsync(userInformation);
                            showToast({
                                type: "info",
                                message: "Information updated",
                            });
                            router.push("/users");
                        }}
                    >
                        Submit
                    </button>
                </div>
            </article>
            {toast}
        </div>
    );
}
