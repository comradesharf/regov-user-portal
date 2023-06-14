import Header from "#root/_components/Header";
import QueryClientProvider from "#root/_components/QueryClientProvider";
import cn from "#root/_libs/cn";
import Fonts from "#root/_libs/Fonts";
import "#root/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { ReactNode } from "react";

config.autoAddCss = false;

export const metadata = {
    title: "ReGov :: User Registration Portal",
    description: "User registration portal",
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(Fonts.Inter.variable, Fonts.Jakarta.variable, Fonts.Roboto_Mono.variable)}
        >
            <body>
                <QueryClientProvider>
                    <Header />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
