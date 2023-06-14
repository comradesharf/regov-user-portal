module.exports = (plop) => {
    plop.setHelper("substring", function (text, start, end) {
        if (typeof end === "number") {
            return text.substring(start, end);
        }
        return text.substring(start);
    });

    plop.setGenerator("component", {
        description: "React Component",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
            {
                type: "input",
                name: "name",
                message: "React component name",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/_components/{{name}}.tsx",
                template: `export type {{name}}Props = {};

export default function {{name}}({}: {{name}}Props) {
    return null;
}
                `,
                abortOnFail: false,
            },
            {
                type: "add",
                path: "{{dir}}/_components/{{name}}.stories.tsx",
                template: `import {{name}} from "#root/{{substring dir 10}}/_components/{{name}}";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof {{name}}> = {
    component: {{name}},
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof {{name}}>;

export const Primary: Story = {};
                `,
            },
        ],
    });

    plop.setGenerator("page", {
        description: "Page",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/page.tsx",
                template: `export type PageProps = {};

export default function Page({}: PageProps) {
    return null;
}
                `,
                abortOnFail: false,
            },
        ],
    });

    plop.setGenerator("loading", {
        description: "Loading",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/loading.tsx",
                template: `export type LoadingProps = {};

export default function Loading({}: LoadingProps) {
    return null;
}
                `,
                abortOnFail: false,
            },
        ],
    });

    plop.setGenerator("default", {
        description: "Default",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/default.tsx",
                template: `export type DefaultProps = {};

export default function Default({}: DefaultProps) {
    return null;
}
                `,
                abortOnFail: false,
            },
        ],
    });

    plop.setGenerator("layout", {
        description: "Layout",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/layout.tsx",
                template: `export type LayoutProps = {};

export default function Layout({}: LayoutProps) {
    return null;
}
                `,
                abortOnFail: false,
            },
            {
                type: "add",
                path: "{{dir}}/layout.stories.tsx",
                template: `import Layout from "#root/{{substring dir 10}}/layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Layout> = {
    component: Layout,
    tags: ["autodocs"],
    args: {},
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
                `,
            },
        ],
    });

    plop.setGenerator("hook", {
        description: "Hook",
        prompts: [
            {
                type: "input",
                name: "dir",
                message: "React component directory",
            },
            {
                type: "input",
                name: "name",
                message: "React component name",
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{dir}}/_hooks/use{{name}}.ts",
                template: `export default function use{{name}}() {
    return null;
}
                `,
                abortOnFail: false,
            },
        ],
    });
};
