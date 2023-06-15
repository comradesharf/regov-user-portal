"use client";

import cn from "#root/_libs/cn";
import { InputHTMLAttributes } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type NumberInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
    Partial<Pick<InputHTMLAttributes<any>, "min" | "max" | "step" | "disabled">> & {
        label?: string;
        fullWidth?: boolean;
    };

export default function NumberInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    min,
    max,
    step,
    defaultValue,
    shouldUnregister,
    rules,
    label,
    disabled,
    fullWidth,
}: NumberInputProps<TFieldValues, TName>) {
    const { field, formState, fieldState } = useController({
        name,
        control,
        defaultValue,
        shouldUnregister,
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
                {...field}
                value={field.value ?? ""}
                ref={field.ref}
                type="number"
                className={cn("input", "input-bordered", "input-sm", "input-primary", {
                    "w-full": fullWidth,
                    "input-error": fieldState.invalid,
                })}
                min={min}
                max={max}
                step={step}
                disabled={!!disabled || formState.isSubmitting}
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
