import RangeInput from "#root/_components/forms/RangeInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof RangeInput> = {
    component: RangeInput,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        return <RangeInput {...args} control={form.control} name="value" />;
    },
    parameters: {
        controls: {
            exclude: ["name", "rules", "shouldUnregister", "control", "startDecorator"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof RangeInput>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 10,
    },
};
