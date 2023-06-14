import SignInUserForm from "#root/sign-in/_components/SignInUserForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SignInUserForm> = {
    component: SignInUserForm,
    tags: ["autodocs"],
    args: {
        email: "hisham@gmail.com",
    },
};

export default meta;

type Story = StoryObj<typeof SignInUserForm>;

export const Primary: Story = {};
