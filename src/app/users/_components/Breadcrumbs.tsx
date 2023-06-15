"use client";

import cn from "#root/_libs/cn";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type BreadcrumbsProps = {};

export default function Breadcrumbs({}: BreadcrumbsProps) {
    const pathname = usePathname();

    return (
        <div className={cn("prose", "mx-auto", "max-w-6xl", "px-2")}>
            <div className={cn("breadcrumbs", "text-sm")}>
                <ul>
                    <li>
                        <Link href="/users">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </li>
                    {pathname
                        .split("/")
                        .filter(Boolean)
                        .map((segment) => (
                            <li key={segment} className={cn("uppercase")}>
                                {segment}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
