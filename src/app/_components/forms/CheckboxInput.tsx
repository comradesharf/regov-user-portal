"use client";

import cn from "#root/_libs/cn";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, ReactNode, useId } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type CheckboxInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
    Pick<InputHTMLAttributes<any>, "onChange" | "disabled"> & {
        checkedIcon?: ReactNode;
        icon?: ReactNode;
        classes?: {
            root?: string;
            input?: string;
            icon?: string;
            checkedIcon?: string;
        };
    };

export default function CheckboxInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    defaultValue,
    shouldUnregister,
    name,
    rules,
    checkedIcon,
    icon,
    classes,
    onChange,
    disabled,
}: CheckboxInputProps<TFieldValues, TName>) {
    const { field, formState } = useController({
        control,
        defaultValue,
        shouldUnregister,
        name,
        rules,
    });

    const uid = useId();

    const id = `${name}-${uid}`;

    return (
        <div className={classes?.root}>
            <input
                ref={field.ref}
                type="checkbox"
                id={id}
                checked={field.value ?? false}
                value={field.value ?? "false"}
                className={cn("peer", "hidden", classes?.input)}
                onChange={(event) => {
                    field.onChange(event);
                    onChange?.(event);
                }}
                onBlur={field.onBlur}
                disabled={disabled || formState.isSubmitting}
            />
            <label
                htmlFor={id}
                className={cn("peer-checked:hidden", "cursor-pointer", classes?.icon)}
            >
                {!!icon ? icon : <FontAwesomeIcon icon={faSquare} />}
            </label>
            <label
                htmlFor={id}
                className={cn(
                    "hidden",
                    "peer-checked:block",
                    "cursor-pointer",
                    classes?.checkedIcon
                )}
            >
                {!!checkedIcon ? checkedIcon : <FontAwesomeIcon icon={faSquareCheck} />}
            </label>
        </div>
    );
}
