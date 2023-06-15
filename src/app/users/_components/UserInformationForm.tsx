import NumberInput from "#root/_components/forms/NumberInput";
import TextAreaInput from "#root/_components/forms/TextAreaInput";
import TextInput from "#root/_components/forms/TextInput";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSwiper } from "swiper/react";

export type UserInformationFormProps = {
    userInformation?: Schemas.UserInformationType;
    onUpdate: (value?: Schemas.UserInformationType) => void;
};

export default function UserInformationForm({
    userInformation,
    onUpdate,
}: UserInformationFormProps) {
    const form = useForm<Schemas.UserInformationType>({
        values: userInformation,
        resolver: zodResolver(Schemas.UserInformation),
    });

    const swiper = useSwiper();

    return (
        <div className={cn("card", "prose", "mx-auto", "max-w-2xl", "shadow-xl", "card-compact")}>
            <form
                className={cn("card-body")}
                onSubmit={form.handleSubmit(async (value) => {
                    onUpdate(value);
                    swiper.slideNext();
                })}
            >
                <h6 className={cn("card-title")}>Basic Information</h6>
                <TextInput name="fullName" control={form.control} label="Full Name" />
                <NumberInput name="age" control={form.control} label="Age" />
                <TextAreaInput name="address" control={form.control} label="Address" rows={5} />
                <TextInput name="job" control={form.control} label="Job" />

                <div className={cn("card-actions", "justify-end")}>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary")}
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}
