import { ReactElement, ReactNode } from "react";
import { FieldValues, useWatch } from "react-hook-form";
import {
    Control,
    DeepPartialSkipArrayKey,
    FieldPath,
    FieldPathValue,
    FieldPathValues,
} from "react-hook-form/dist/types";

export default function Watch<TFieldValues extends FieldValues = FieldValues>(props: {
    render: (props: DeepPartialSkipArrayKey<TFieldValues>) => ReactNode;
}): ReactElement;

export default function Watch<TFieldValues extends FieldValues = FieldValues>(props: {
    defaultValue?: DeepPartialSkipArrayKey<TFieldValues>;
    control?: Control<TFieldValues>;
    disabled?: boolean;
    exact?: boolean;
    render: (props: DeepPartialSkipArrayKey<TFieldValues>) => ReactNode;
}): ReactElement;

export default function Watch<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
    name: TFieldName;
    defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
    control?: Control<TFieldValues>;
    disabled?: boolean;
    exact?: boolean;
    render: (props: FieldPathValue<TFieldValues, TFieldName>) => ReactNode;
}): ReactElement;

export default function Watch<
    TFieldValues extends FieldValues = FieldValues,
    TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[]
>(props: {
    name: readonly [...TFieldNames];
    defaultValue?: DeepPartialSkipArrayKey<TFieldValues>;
    control?: Control<TFieldValues>;
    disabled?: boolean;
    exact?: boolean;
    render: (props: FieldPathValues<TFieldValues, TFieldNames>) => ReactNode;
}): ReactElement;

export default function Watch(props: any): any {
    return props.render(useWatch(props as any));
}
