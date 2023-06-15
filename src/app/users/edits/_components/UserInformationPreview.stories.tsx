import UserInformationPreview from "#root/users/edits/_components/UserInformationPreview";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserInformationPreview> = {
    component: UserInformationPreview,
    tags: ["autodocs"],
    args: {
        userInformation: {
            fullName: "Hisham",
            passports: [],
            address: "KL Eco\n City59200 Kuala Lumpur, Federal Territory of Kuala Lumpur",
            age: 20,
            job: "Manager",
        },
    },
};

export default meta;

type Story = StoryObj<typeof UserInformationPreview>;

export const Primary: Story = {};
