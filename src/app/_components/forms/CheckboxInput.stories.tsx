import CheckboxInput from "#root/_components/forms/CheckboxInput";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

const meta: Meta<typeof CheckboxInput> = {
    component: CheckboxInput,
    tags: ["autodocs"],
    render(args: any) {
        const form = useForm<{ value: number }>({
            defaultValues: args.defaultValue,
        });

        return <CheckboxInput {...args} control={form.control} name="value" />;
    },
    args: {},
};

export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Primary: Story = {};

export const OnlyIcon: Story = {
    args: {
        icon: <FontAwesomeIcon icon={faLock} size="xs" />,
    },
};

export const OnlyCheckedIcon: Story = {
    args: {
        checkedIcon: <FontAwesomeIcon icon={faUnlock} size="xs" />,
    },
};

export const BothIcons: Story = {
    args: {
        icon: <FontAwesomeIcon icon={faLock} size="xs" />,
        checkedIcon: <FontAwesomeIcon icon={faUnlock} size="xs" />,
    },
};
