import cn from "#root/_libs/cn";

export type FileUploadProgressProps = { progress: number };

export default function FileUploadProgress({ progress }: FileUploadProgressProps) {
    const roundedProgress = Math.round(progress);
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
                "justify-center",
                "items-center",
                "grow-0"
            )}
        >
            <div
                className={cn(
                    "radial-progress",
                    "text-primary",
                    "[--size:2.8rem]",
                    "[--thickness:3px]",
                    "text-2xs"
                )}
                style={
                    {
                        "--value": roundedProgress,
                    } as any
                }
            >
                {roundedProgress}%
            </div>
        </div>
    );
}
