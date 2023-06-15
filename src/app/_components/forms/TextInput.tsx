import cn from "#root/_libs/cn";
import { InputHTMLAttributes } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type TextInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    fullWidth?: boolean;
} & Pick<InputHTMLAttributes<any>, "placeholder" | "disabled" | "type" | "autoFocus">;

export default function TextInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    defaultValue,
    label,
    shouldUnregister,
    control,
    name,
    rules,
    disabled,
    placeholder,
    fullWidth,
    type,
    autoFocus,
}: TextInputProps<TFieldValues, TName>) {
    const { field, formState, fieldState } = useController({
        defaultValue,
        shouldUnregister,
        control,
        name,
        rules,
    });

    return (
        <div
            className={cn("form-control", "group", "relative", {
                "w-full": fullWidth,
            })}
        >
            {label ? (
                <label className={cn("label")}>
                    <span className={cn("label-text", "label-text-alt")}>{label}</span>
                </label>
            ) : null}
            <input
                type={type}
                autoFocus={autoFocus}
                {...field}
                className={cn("input", "input-bordered", "input-sm", "input-primary", {
                    "w-full": fullWidth,
                    "input-error": fieldState.invalid,
                })}
                aria-invalid={fieldState.invalid}
                disabled={!!disabled || formState.isSubmitting}
                placeholder={placeholder}
                value={field.value ?? ""}
            />
            {fieldState.invalid ? (
                <span
                    role="alert"
                    className={cn(
                        "absolute",
                        "z-20",
                        "hidden",
                        "rounded",
                        "bg-pink-600",
                        "px-2",
                        "py-1",
                        "text-2xs",
                        "font-semibold",
                        "text-white",
                        "transition",
                        "group-hover:block",
                        "-bottom-7"
                    )}
                >
                    {fieldState.error?.message}
                </span>
            ) : null}
        </div>
    );
}
