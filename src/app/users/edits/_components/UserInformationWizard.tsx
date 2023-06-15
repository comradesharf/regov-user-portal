"use client";

import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import UserInformationForm from "#root/users/edits/_components/UserInformationForm";
import UserInformationPreview from "#root/users/edits/_components/UserInformationPreview";
import UserUploadForm from "#root/users/edits/_components/UserUploadForm";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export type UserInformationWizardProps = {
    userInformation?: Schemas.UserInformationType;
    user: { uid: string };
};

export default function UserInformationWizard({
    userInformation: defaultUserInformation,
    user,
}: UserInformationWizardProps) {
    const [userInformation, setUserInformation] = useState(defaultUserInformation);

    return (
        <Swiper>
            <SwiperSlide className={cn("py-20")}>
                <UserInformationForm
                    userInformation={userInformation}
                    onUpdate={setUserInformation}
                />
            </SwiperSlide>
            <SwiperSlide className={cn("py-20")}>
                <UserUploadForm
                    user={user}
                    userInformation={userInformation}
                    onUpdate={setUserInformation}
                />
            </SwiperSlide>
            <SwiperSlide className={cn("py-20")}>
                <UserInformationPreview userInformation={userInformation} user={user} />
            </SwiperSlide>
        </Swiper>
    );
}
