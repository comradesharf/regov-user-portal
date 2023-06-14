import Loader from "#root/_components/Loader";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Loader> = {
    component: Loader,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Primary: Story = {};
