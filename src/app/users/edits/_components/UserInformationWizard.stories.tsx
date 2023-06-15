import UserInformationWizard from "#root/users/edits/_components/UserInformationWizard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserInformationWizard> = {
    component: UserInformationWizard,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof UserInformationWizard>;

export const Primary: Story = {};
