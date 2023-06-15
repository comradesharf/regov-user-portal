import FileUploadProgress from "#root/users/edits/_components/FileUploadProgress";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FileUploadProgress> = {
    component: FileUploadProgress,
    tags: ["autodocs"],
    args: {
        progress: 70,
    },
};

export default meta;

type Story = StoryObj<typeof FileUploadProgress>;

export const Primary: Story = {};
