import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...props: Parameters<typeof clsx>) {
    return twMerge(clsx(props));
}
