import Page from "#root/sign-in/page";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Page> = {
    component: Page,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
