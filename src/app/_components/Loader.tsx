import cn from "#root/_libs/cn";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type LoaderProps = {};

export default function Loader({}: LoaderProps) {
    return (
        <div
            className={cn(
                "rounded-2xl",
                "w-14",
                "h-14",
                "bg-primary-content",
                "flex",
                "justify-center",
                "items-center",
                "border-primary",
                "border"
            )}
        >
            <FontAwesomeIcon icon={faCog} spin className={cn("text-primary")} size="2xl" />
        </div>
    );
}
