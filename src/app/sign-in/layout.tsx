import cn from "#root/_libs/cn";
import { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return <div className={cn("pt-20")}>{children}</div>;
}
