import Header from "#root/_components/Header";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
    component: Header,
    tags: ["autodocs"],
    args: {},
    parameters: {
        docs: {
            story: {
                inline: false,
                height: 1000,
            },
        },
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {};
