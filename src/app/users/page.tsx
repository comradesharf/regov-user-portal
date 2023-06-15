"use client";

import Loader from "#root/_components/Loader";
import useUser from "#root/_hooks/useUser";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import UserInformationForm from "#root/users/_components/UserInformationForm";
import UserUploadForm from "#root/users/_components/UserUploadForm";
import useUserInformation from "#root/users/_hooks/useUserInformation";
import { useDeferredValue, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export type PageProps = {};

export default function Page({}: PageProps) {
    const user = useUser({ required: true });

    const userInformation = useUserInformation();

    const isPending = useDeferredValue(user === undefined || userInformation.isInitialLoading);

    const [updatedUserInformation, setUpdatedUserInformation] = useState<
        Schemas.UserInformationType | undefined
    >(undefined);

    useEffect(() => {
        if (userInformation.data) setUpdatedUserInformation(userInformation.data.data());
    }, [userInformation.data]);

    if (isPending) {
        return (
            <div className={cn("h-[60vh]", "flex", "items-center", "justify-center")}>
                <Loader />
            </div>
        );
    }

    return (
        <Swiper>
            <SwiperSlide className={cn("py-20")}>
                <UserInformationForm
                    userInformation={updatedUserInformation}
                    onUpdate={setUpdatedUserInformation}
                />
            </SwiperSlide>
            <SwiperSlide className={cn("py-20")}>
                <UserUploadForm
                    userInformation={updatedUserInformation}
                    onUpdate={setUpdatedUserInformation}
                />
            </SwiperSlide>
        </Swiper>
    );
}
