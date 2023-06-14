"use client";

import TextInput from "#root/_components/forms/TextInput";
import Loader from "#root/_components/Loader";
import useToast from "#root/_hooks/useToast";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import SignInUserForm from "#root/sign-in/_components/SignInUserForm";
import SignUpUserForm from "#root/sign-in/_components/SignUpUserForm";
import useAuthenticateUser from "#root/sign-in/_hooks/useAuthenticateUser";
import useSignInWithGoogle from "#root/sign-in/_hooks/useSignInWithGoogle";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type PageProps = {};

export default function Page({}: PageProps) {
    const form = useForm<Schemas.EmailType>({
        resolver: zodResolver(Schemas.EmailValidation),
    });

    const { toast, showToast } = useToast();

    const isPending = useAuthenticateUser();

    const signInWithGoogle = useSignInWithGoogle();

    const [formStep, setFormStep] = useState<"validate" | "sign-in" | "sign-up">("validate");

    if (isPending) {
        return (
            <div className={cn("h-[60vh]", "flex", "items-center", "justify-center")}>
                <Loader />
            </div>
        );
    }

    if (formStep === "sign-up") {
        return <SignUpUserForm email={form.getValues("email")} />;
    }

    if (formStep === "sign-in") {
        return <SignInUserForm email={form.getValues("email")} />;
    }

    return (
        <div className={cn("prose", "card", "shadow-xl", "mx-auto", "max-w-xl")}>
            <form
                className={cn("card-body")}
                noValidate
                onSubmit={form.handleSubmit(async (value) => {
                    const response = await fetch("/api/users/emails", {
                        body: JSON.stringify(value),
                        method: "POST",
                    });

                    if (!response.ok) {
                        return;
                    }

                    const { valid, provider } = Schemas.EmailValidationResponse.parse(
                        await response.json()
                    );

                    if (!valid) {
                        setFormStep("sign-up");
                        return;
                    }

                    if (valid && provider) {
                        setFormStep("sign-in");
                        return;
                    }

                    if (valid && !provider) {
                        showToast({
                            type: "error",
                            message: "Use sign with Google instead of sign in with email.",
                        });
                        return;
                    }
                })}
            >
                <p className={cn("card-title")}>Sign in to Portal</p>

                <button
                    type="button"
                    className={cn("btn", "btn-outline", "btn-primary", "btn-sm", "w-full")}
                    disabled={signInWithGoogle.isLoading}
                    onClick={() => signInWithGoogle.mutate()}
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-3" />
                    Continue with Google
                </button>

                <div className={cn("divider")}>OR</div>

                <TextInput name="email" control={form.control} placeholder="Email" fullWidth />

                <div className={cn("card-actions")}>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary", "w-full")}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Validating..." : "Next"}
                    </button>
                </div>
            </form>
            {toast}
        </div>
    );
}
