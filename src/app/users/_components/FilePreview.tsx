import useSecureFileUrl from "#root/_hooks/useSecureFileUrl";
import cn from "#root/_libs/cn";

export type FilePreviewProps = {
    path: string;
};

export default function FilePreview({ path }: FilePreviewProps) {
    const secureFileUrl = useSecureFileUrl({ path });

    return (
        <div
            className={cn(
                "[aspect-ratio:9/12]",
                "w-28",
                "border",
                "border-dashed",
                "rounded-2xl",
                "border-primary",
                "text-neutral",
                "bg-neutral-content",
                "flex",
                "grow-0",
                "p-1",
                "hover:bg-primary-content",
                "hover:text-primary"
            )}
        >
            {secureFileUrl.data ? (
                <a
                    href={secureFileUrl.data}
                    target="_blank"
                    className={cn(
                        "bg-checkered",
                        "block",
                        "rounded-xl",
                        "overflow-hidden",
                        "w-full",
                        "h-full"
                    )}
                >
                    <img
                        alt={path}
                        src={secureFileUrl.data}
                        className={cn("object-contain", "w-full", "h-full", "m-0")}
                    />
                </a>
            ) : null}
        </div>
    );
}
