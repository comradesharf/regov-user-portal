import type { StorybookConfig } from "@storybook/nextjs";
import * as path from "path";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve!.alias = {
            ...config.resolve!.alias,
            "#root": path.resolve(__dirname, "../src/app"),
            "#storybook": __dirname,
        };

        return config;
    },
};
export default config;
