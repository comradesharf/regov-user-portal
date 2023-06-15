import UserDashboard from "#root/users/_components/UserDashboard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserDashboard> = {
    component: UserDashboard,
    tags: ["autodocs"],
    args: {
        user: {
            uid: "abc123",
        },
        userInformation: {
            fullName: "Hisham",
            passports: [],
            address: "KL Eco\n City59200 Kuala Lumpur, Federal Territory of Kuala Lumpur",
            age: 20,
            job: "Manager",
            isAdmin: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof UserDashboard>;

export const Primary: Story = {};
