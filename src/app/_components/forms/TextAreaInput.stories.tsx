import TextAreaInput from "#root/_components/forms/TextAreaInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof TextAreaInput> = {
    component: TextAreaInput,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        useEffect(() => {
            void form.trigger();
        }, [form]);

        return (
            <TextAreaInput
                {...args}
                control={form.control}
                name="value"
                rules={{
                    maxLength: {
                        value: 10,
                        message: "Max length is 10 characters",
                    },
                }}
            />
        );
    },
    parameters: {
        controls: {
            exclude: ["name", "rules", "shouldUnregister", "control"],
        },
    },
    args: {
        defaultValue: {
            value: "test",
        },
        rows: 10,
    },
};

export default meta;

type Story = StoryObj<typeof TextAreaInput>;

export const Primary: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Input Name",
    },
};

export const Invalid: Story = {
    args: {
        defaultValue: "This is very long name",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};
