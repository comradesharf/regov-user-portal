"use client";

import cn from "#root/_libs/cn";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, ReactNode, useEffect, useId, useRef } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type NumberInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
    Partial<Pick<InputHTMLAttributes<any>, "min" | "max" | "step" | "disabled">> & {
        startDecorator?: ReactNode;
        label?: string;
        fullWidth?: boolean;
        squared?: boolean;
    };

export default function NumberInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    startDecorator,
    min,
    max,
    step,
    defaultValue,
    shouldUnregister,
    rules,
    label,
    disabled,
    fullWidth,
    squared,
}: NumberInputProps<TFieldValues, TName>) {
    const { field, formState, fieldState } = useController({
        name,
        control,
        defaultValue,
        shouldUnregister,
        rules,
    });

    const nodeRef = useRef<HTMLInputElement | null>();

    useEffect(() => {
        let target: HTMLInputElement;

        if (!nodeRef.current) {
            return;
        }

        target = nodeRef.current;

        const handleChange = (event: Event) => {
            field.onChange((event.target as HTMLInputElement).value);
        };

        target.addEventListener("input", handleChange);
        return () => {
            if (!target) {
                return;
            }
            target.removeEventListener("input", handleChange);
        };
    }, [field]);

    const _id = useId();

    const id = `${name}-${_id}`;

    return (
        <label htmlFor={id} className={cn("block", "group")}>
            {!!label ? (
                <span className={cn("mb-1.5", "block", "text-xs", "font-medium", "text-slate-700")}>
                    {label}
                </span>
            ) : null}
            <div
                className={cn(
                    "inline-flex",
                    "h-6",
                    "overflow-hidden",
                    "border-[1px]",
                    "border-gray-200",
                    "bg-white",
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
                        rounded: !squared,
                    }
                )}
            >
                {!!startDecorator ? (
                    <span
                        className={cn(
                            "flex",
                            "items-center",
                            "justify-center",
                            "pl-2",
                            "pt-[4px]",
                            "text-2xs",
                            "font-light",
                            "text-gray-400"
                        )}
                    >
                        {startDecorator}
                    </span>
                ) : null}
                <input
                    {...field}
                    value={field.value ?? ""}
                    ref={(e) => {
                        field.ref(e);
                        nodeRef.current = e;
                    }}
                    type="number"
                    className={cn(
                        "w-full",
                        "p-2",
                        "text-xs",
                        "outline-none",
                        "[appearance:textfield]",
                        "selection:bg-purple-300",
                        "disabled:bg-slate-50",
                        "disabled:text-slate-500",
                        "[&::-webkit-inner-spin-button]:m-0",
                        "[&::-webkit-inner-spin-button]:appearance-none",
                        "[&::-webkit-outer-spin-button]:m-0",
                        "[&::-webkit-outer-spin-button]:appearance-none"
                    )}
                    tabIndex={0}
                    min={min}
                    max={max}
                    step={step}
                    id={id}
                    disabled={!!disabled || formState.isSubmitting}
                />
                <div className={cn("flex", "flex-col", "bg-inherit")}>
                    <button
                        type="button"
                        className={cn(
                            "flex",
                            "h-1",
                            "w-4",
                            "shrink",
                            "grow",
                            "items-center",
                            "justify-center",
                            "border-b",
                            "border-l",
                            "border-b-gray-200",
                            "border-l-gray-200",
                            "bg-inherit",
                            "p-0",
                            "text-gray-300",
                            "hover:text-gray-700",
                            "active:text-gray-200",
                            "disabled:text-gray-200"
                        )}
                        aria-label="step up"
                        tabIndex={-1}
                        onClick={() => {
                            nodeRef.current?.stepUp();
                            nodeRef.current?.dispatchEvent(new Event("input"));
                        }}
                        disabled={!!disabled || formState.isSubmitting}
                    >
                        <FontAwesomeIcon icon={faCaretUp} size="2xs" />
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "flex",
                            "h-1",
                            "w-4",
                            "shrink",
                            "grow",
                            "items-center",
                            "justify-center",
                            "border-l",
                            "border-l-gray-200",
                            "bg-inherit",
                            "p-0",
                            "text-gray-300",
                            "hover:text-gray-700",
                            "active:text-gray-200",
                            "disabled:text-gray-200"
                        )}
                        aria-label="step down"
                        tabIndex={-1}
                        onClick={() => {
                            nodeRef.current?.stepDown();
                            nodeRef.current?.dispatchEvent(new Event("input"));
                        }}
                        disabled={!!disabled || formState.isSubmitting}
                    >
                        <FontAwesomeIcon icon={faCaretDown} size="2xs" />
                    </button>
                </div>
            </div>
            {fieldState.invalid ? (
                <span
                    role="alert"
                    className={cn(
                        "absolute",
                        "z-20",
                        "mt-0.5",
                        "hidden",
                        "rounded",
                        "bg-pink-600",
                        "px-2",
                        "py-1",
                        "text-2xs",
                        "font-semibold",
                        "text-white",
                        "transition",
                        "group-hover:block"
                    )}
                >
                    {fieldState.error?.message}
                </span>
            ) : null}
        </label>
    );
}
