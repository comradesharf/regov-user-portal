"use client";

import cn from "#root/_libs/cn";
import { useLayoutEffect, useRef } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type RangeSliderProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
    Partial<Pick<HTMLInputElement, "min" | "max" | "step" | "disabled">>;

export default function RangeInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    min = "0",
    max = "100",
    step,
    name,
    defaultValue,
    shouldUnregister,
    rules,
    control,
    disabled,
}: RangeSliderProps<TFieldValues, TName>) {
    const { field } = useController({
        name,
        control,
        defaultValue,
        shouldUnregister,
        rules,
    });

    const nodeRef = useRef<HTMLInputElement | null>();

    useLayoutEffect(() => {
        if (!nodeRef.current) {
            return;
        }

        const target = nodeRef.current;
        const value = field.value ?? "0";
        target.style.backgroundSize = ((+value - +min) * 100) / (+max - +min) + "% 100%";
    }, [field.value, min, max]);

    return (
        <input
            {...field}
            value={field.value || "0"}
            ref={(e) => {
                field.ref(e);
                nodeRef.current = e;
            }}
            type="range"
            className={cn(
                "h-[4px]",
                "w-full",
                "appearance-none",
                "rounded-full",
                "bg-gray-200",
                "bg-no-repeat",
                "outline-none",
                "[background-image:linear-gradient(#000,#000)]",
                "disabled:[background-image:linear-gradient(#94a3b8,#94a3b8)]",

                "[&::-moz-range-thumb]:-mt-[1px]",
                "[&::-moz-range-thumb]:h-[14px]",
                "[&::-moz-range-thumb]:w-[14px]",
                "[&::-moz-range-thumb]:cursor-ew-resize",
                "[&::-moz-range-thumb]:appearance-none",
                "[&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:border-none",
                "[&::-moz-range-thumb]:bg-white",
                "[&::-moz-range-thumb]:drop-shadow",

                "[&::-moz-range-track]:appearance-none",

                "[&::-webkit-slider-runnable-track]:appearance-none",

                "[&::-webkit-slider-thumb]:-mt-[1px]",
                "[&::-webkit-slider-thumb]:h-[14px]",
                "[&::-webkit-slider-thumb]:w-[14px]",
                "[&::-webkit-slider-thumb]:cursor-ew-resize",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-white",
                "[&::-webkit-slider-thumb]:drop-shadow-md"
            )}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
        />
    );
}
