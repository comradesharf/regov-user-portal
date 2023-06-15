import { Options } from "#root/_hooks/useFileUpload";
import cn from "#root/_libs/cn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type FileUploadInputProps = {
    inputProps: Options;
};

export default function FileUploadInput({ inputProps }: FileUploadInputProps) {
    return (
        <label
            htmlFor={inputProps.id}
            className={cn(
                "[aspect-ratio:9/12]",
                "w-28",
                "border",
                "border-dashed",
                "rounded-2xl",
                "border-primary",
                "text-neutral",
                "bg-neutral-content",
                "hover:bg-primary-content",
                "hover:text-primary",
                "flex",
                "justify-center",
                "items-center",
                "cursor-pointer",
                "justify-self-center"
            )}
        >
            <FontAwesomeIcon icon={faPlus} size="xl" />
            <input {...inputProps} className={cn("hidden")} />
        </label>
    );
}
