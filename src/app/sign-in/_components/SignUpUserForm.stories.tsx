import SignUpUserForm from "#root/sign-in/_components/SignUpUserForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SignUpUserForm> = {
    component: SignUpUserForm,
    tags: ["autodocs"],
    args: {
        email: "hisham@gmail.com",
    },
};

export default meta;

type Story = StoryObj<typeof SignUpUserForm>;

export const Primary: Story = {};
