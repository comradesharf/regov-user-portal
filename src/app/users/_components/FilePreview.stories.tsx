import FilePreview from "#root/users//_components/FilePreview";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FilePreview> = {
    component: FilePreview,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof FilePreview>;

export const Primary: Story = {};
