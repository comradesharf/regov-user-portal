import TextInput from "#root/_components/forms/TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof TextInput> = {
    component: TextInput,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        useEffect(() => {
            void form.trigger();
        }, [form]);

        return (
            <TextInput
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
    },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

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
