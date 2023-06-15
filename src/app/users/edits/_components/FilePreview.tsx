"use client";

import useDeleteFile from "#root/_hooks/useDeleteFile";
import useSecureFileUrl from "#root/_hooks/useSecureFileUrl";
import cn from "#root/_libs/cn";

export type FilePreviewProps = {
    path: string;
    readonly?: boolean;
    onDelete?: (path: string) => void;
};

export default function FilePreview({ path, readonly, onDelete }: FilePreviewProps) {
    const secureFileUrl = useSecureFileUrl({ path });

    const deleteFile = useDeleteFile({ path });

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
                "hover:text-primary",
                "relative",
                "group",
                "overflow-hidden",
                "self-center",
                "justify-self-center"
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
            {!readonly ? (
                <button
                    className={cn(
                        "absolute",
                        "btn",
                        "btn-xs",
                        "btn-error",
                        "shadow",
                        "right-1/2",
                        "bottom-1",
                        "translate-x-1/2",
                        "translate-y-8",
                        "group-hover:translate-y-0"
                    )}
                    type="button"
                    disabled={deleteFile.isLoading}
                    onClick={async () => {
                        await deleteFile.mutateAsync();
                        onDelete?.(path);
                    }}
                >
                    Remove
                </button>
            ) : null}
        </div>
    );
}
