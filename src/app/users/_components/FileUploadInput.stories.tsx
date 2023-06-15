import FileUploadInput from "#root/users//_components/FileUploadInput";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FileUploadInput> = {
    component: FileUploadInput,
    tags: ["autodocs"],
    args: {
        inputProps: {
            id: "file-upload",
        },
    },
};

export default meta;

type Story = StoryObj<typeof FileUploadInput>;

export const Primary: Story = {};
