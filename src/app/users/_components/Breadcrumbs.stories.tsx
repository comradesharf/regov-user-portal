import Breadcrumbs from "#root/users/_components/Breadcrumbs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Breadcrumbs> = {
    component: Breadcrumbs,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {};
