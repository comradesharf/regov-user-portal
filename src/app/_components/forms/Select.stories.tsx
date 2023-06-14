import Select from "#root/_components/forms/Select";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof Select> = {
    component: Select,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        useEffect(() => {
            void form.trigger();
        }, [form]);

        return (
            <Select
                {...args}
                control={form.control}
                name="value"
                rules={{
                    maxLength: {
                        value: 10,
                        message: "Max length is 10 characters",
                    },
                }}
            >
                <option value="none">None</option>
                <option value="apple">Apple</option>
                <option value="orange">Orange</option>
            </Select>
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

type Story = StoryObj<typeof Select>;

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
