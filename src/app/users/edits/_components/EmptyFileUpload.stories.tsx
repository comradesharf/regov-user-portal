import EmptyFileUpload from "#root/users/edits/_components/EmptyFileUpload";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EmptyFileUpload> = {
    component: EmptyFileUpload,
    tags: ["autodocs"],
    args: {
        inputProps: {
            id: "file-upload",
            accept: "image/png,image/jpg,image/jpeg",
        },
    },
};

export default meta;

type Story = StoryObj<typeof EmptyFileUpload>;

export const Primary: Story = {};
