import useToast from "#root/_hooks/useToast";
import useUpdateUserInformation from "#root/_hooks/useUpdateUserInformation";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import UIP from "#root/users/_components/UserInformationPreview";
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

                <UIP userInformation={userInformation} />

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
