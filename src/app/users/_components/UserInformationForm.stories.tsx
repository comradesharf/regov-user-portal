import UserInformationForm from "#root/users/_components/UserInformationForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserInformationForm> = {
    component: UserInformationForm,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof UserInformationForm>;

export const Primary: Story = {};
