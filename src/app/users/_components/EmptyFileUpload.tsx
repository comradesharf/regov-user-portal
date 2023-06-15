import { Options } from "#root/_hooks/useFileUpload";
import cn from "#root/_libs/cn";
import FileUploadInput from "#root/users/_components/FileUploadInput";

export type EmptyFileUploadProps = {
    inputProps: Options;
};

export default function EmptyFileUpload({ inputProps }: EmptyFileUploadProps) {
    return (
        <div
            className={cn(
                "flex",
                "items-center",
                "justify-center",
                "rounded-xl",
                "min-h-[400px]",
                "bg-gray-100",
                "flex-col",
                "p-10"
            )}
        >
            <h5>No Identity Card/Passport</h5>
            <span className={cn("text-gray-400", "text-xs", "text-center", "block", "mb-10")}>
                Your uploaded identity card/passport will be listed here
            </span>
            <FileUploadInput inputProps={inputProps} />
        </div>
    );
}
