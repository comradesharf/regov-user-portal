import QueryClientProvider from "#root/_components/QueryClientProvider";
import "#root/globals.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        backgrounds: {
            default: "light",
            grid: {
                cellSize: 8,
                opacity: 0.5,
                cellAmount: 5,
                offsetX: 14,
                offsetY: 14,
            },
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <QueryClientProvider>
                    <Story />
                </QueryClientProvider>
            );
        },
    ],
};

export default preview;
