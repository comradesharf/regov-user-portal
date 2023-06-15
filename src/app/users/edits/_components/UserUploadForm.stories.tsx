import UserUploadForm from "#root/users/edits/_components/UserUploadForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserUploadForm> = {
    component: UserUploadForm,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof UserUploadForm>;

export const Primary: Story = {};
