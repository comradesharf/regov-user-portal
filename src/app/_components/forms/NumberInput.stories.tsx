import NumberInput from "#root/_components/forms/NumberInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof NumberInput> = {
    component: NumberInput,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        useEffect(() => {
            void form.trigger();
        }, [form]);

        return (
            <NumberInput
                {...args}
                control={form.control}
                name="value"
                rules={{
                    max: {
                        value: 1000,
                        message: "Max value is 1000 characters",
                    },
                }}
            />
        );
    },
    parameters: {
        controls: {
            exclude: ["name", "rules", "shouldUnregister", "control", "startDecorator"],
        },
    },
    args: {
        defaultValue: {
            value: 0,
        },
    },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Primary: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Input Name",
    },
};

export const WithMinAndMax: Story = {
    args: {
        min: "3",
        max: "10",
        defaultValue: {
            value: 3,
        },
    },
};

export const WithStep: Story = {
    args: {
        step: "0.2",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Invalid: Story = {
    args: {
        defaultValue: 10001,
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};
