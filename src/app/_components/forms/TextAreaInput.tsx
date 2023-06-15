import cn from "#root/_libs/cn";
import { TextareaHTMLAttributes } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type TextAreaInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    fullWidth?: boolean;
} & Pick<TextareaHTMLAttributes<any>, "placeholder" | "disabled" | "rows">;

export default function TextAreaInput<
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
    rows,
}: TextAreaInputProps<TFieldValues, TName>) {
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
            <textarea
                {...field}
                className={cn(
                    "textarea",
                    "textarea-bordered",
                    "textarea-sm",
                    "textarea-primary",
                    "leading-normal",
                    {
                        "w-full": fullWidth,
                        "textarea-error": fieldState.invalid,
                    }
                )}
                aria-invalid={fieldState.invalid}
                disabled={!!disabled || formState.isSubmitting}
                placeholder={placeholder}
                rows={rows}
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
