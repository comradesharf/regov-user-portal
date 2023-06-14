import Layout from "#root/sign-in/layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Layout> = {
    component: Layout,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
