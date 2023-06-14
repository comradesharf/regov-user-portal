import NumberInput from "#root/_components/forms/NumberInput";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
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

export const Primary: Story = {
    async play({ canvasElement }) {
        const canvas = within(canvasElement);

        const stepUp = canvas.getByLabelText("step up");
        for (let i = 0; i < 5; i++) {
            await userEvent.click(stepUp);
        }

        const stepDown = canvas.getByLabelText("step down");
        userEvent.click(stepDown);

        const input = canvas.getByRole("spinbutton");

        expect(input).toHaveValue(4);

        await userEvent.type(input, "12");

        expect(input).toHaveValue(412);
    },
};

export const WithDecorator: Story = {
    args: {
        startDecorator: "W",
    },
    async play(args) {
        await Primary.play?.(args);
    },
};

export const WithLabel: Story = {
    args: {
        label: "Input Name",
    },
    async play(args) {
        await Primary.play?.(args);
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
    async play({ canvasElement }) {
        const canvas = within(canvasElement);
        const stepUp = canvas.getByLabelText("step up");

        for (let i = 0; i < 10; i++) {
            await userEvent.click(stepUp);
        }

        const stepDown = canvas.getByLabelText("step down");
        userEvent.click(stepDown);

        await expect(canvas.getByRole("spinbutton")).toHaveValue(9);
    },
};

export const WithStep: Story = {
    args: {
        step: "0.2",
    },
    async play({ canvasElement }) {
        const canvas = within(canvasElement);
        const stepUp = canvas.getByLabelText("step up");

        for (let i = 0; i < 3; i++) {
            await userEvent.click(stepUp);
        }

        const stepDown = canvas.getByLabelText("step down");
        userEvent.click(stepDown);

        await expect(canvas.getByRole("spinbutton")).toHaveValue(0.4);
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

export const Squared: Story = {
    args: {
        squared: true,
    },
};
