import TextInput from "#root/_components/forms/TextInput";
import useToast from "#root/_hooks/useToast";
import * as AuthClientActions from "#root/_libs/AuthClientActions";
import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type SignInUserFormProps = {
    email: string;
};

export default function SignInUserForm({ email }: SignInUserFormProps) {
    const form = useForm<Schemas.EmailSignInType>({
        resolver: zodResolver(Schemas.EmailCredential),
        defaultValues: {
            email,
        },
    });

    const router = useRouter();

    const { toast, showToast } = useToast();

    return (
        <div className={cn("prose", "card", "shadow-xl", "mx-auto", "max-w-xl")}>
            <form
                className={cn("card-body")}
                noValidate
                onSubmit={form.handleSubmit(async ({ password, email }) => {
                    try {
                        await AuthClientActions.signInWithEmail(email, password);
                        showToast({
                            type: "info",
                            message: "You have been signed in.",
                        });
                        router.push("/users");
                    } catch (e: any) {
                        switch (e?.code) {
                            case "auth/wrong-password":
                                showToast({
                                    type: "error",
                                    message: "Wrong password. Try again.",
                                });
                                break;
                            default:
                                console.error("Sign up with email failed", e);
                                showToast({
                                    type: "error",
                                    message: "Unable to sign up now. Try again later.",
                                });
                        }
                    }
                })}
            >
                <h6 className={cn("card-title")}>Enter Your Password</h6>
                <TextInput name="email" control={form.control} label="Email" disabled fullWidth />
                <TextInput
                    name="password"
                    control={form.control}
                    label="Password"
                    fullWidth
                    autoFocus
                    type="password"
                />

                <div className={cn("card-actions")}>
                    <button
                        className={cn("btn", "btn-sm", "btn-primary", "w-full")}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Signing In..." : "Next"}
                    </button>
                </div>
            </form>
            {toast}
        </div>
    );
}
