import cn from "#root/_libs/cn";
import { TextareaHTMLAttributes, useId } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type TextAreaInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    classNameRoot?: string;
    classNameInput?: string;
    classNameLabel?: string;
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
    classNameRoot,
    classNameInput,
    classNameLabel,
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

    const _id = useId();

    const id = `${name}-${_id}`;

    return (
        <label htmlFor={id} className={cn("block", "group", classNameRoot)}>
            {label ? (
                <span
                    className={cn(
                        "mb-1.5",
                        "block",
                        "text-xs",
                        "font-medium",
                        "text-slate-700",
                        classNameLabel
                    )}
                >
                    {label}
                </span>
            ) : null}
            <textarea
                {...field}
                id={id}
                className={cn(
                    "block",
                    "rounded",
                    "border-[1px]",
                    "border-gray-200",
                    "bg-white",
                    "p-2",
                    "text-xs",
                    "outline-none",
                    "transition",
                    "delay-100",
                    "disabled:border-slate-200",
                    "disabled:bg-slate-50",
                    "disabled:text-slate-500",
                    "disabled:shadow-none",
                    {
                        "text-pink-600": fieldState.invalid,
                        "border-pink-500": fieldState.invalid,
                        "focus-within:ring-[2px]": !fieldState.invalid,
                        "focus-within:ring-black": !fieldState.invalid,
                        "w-full": !!fullWidth,
                    },
                    classNameInput
                )}
                aria-invalid={fieldState.invalid}
                disabled={!!disabled || formState.isSubmitting}
                placeholder={placeholder}
                rows={rows}
            />
            {fieldState.invalid ? (
                <span
                    role="alert"
                    className="
                        absolute
                        z-20
                        mt-0.5
                        hidden
                        rounded
                        bg-pink-600
                        px-2
                        py-1
                        text-2xs
                        font-semibold
                        text-white
                        transition
                        group-hover:block
                    "
                >
                    {fieldState.error?.message}
                </span>
            ) : null}
        </label>
    );
}
