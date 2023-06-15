import cn from "#root/_libs/cn";
import * as Schemas from "#root/_libs/Schemas";
import FilePreview from "#root/users/edits/_components/FilePreview";

export type UserInformationPreviewProps = {
    userInformation?: Schemas.UserInformationType;
};

export default function UserInformationPreview({ userInformation }: UserInformationPreviewProps) {
    return (
        <div className={cn("prose")}>
            <div>
                <h4>Full Name</h4>
                <p className={cn("m-0")}>{userInformation?.fullName}</p>
            </div>

            <div>
                <h4>Age</h4>
                <p className={cn("m-0")}>{userInformation?.age}</p>
            </div>

            <div>
                <h4>Address</h4>
                <p className={cn("m-0", "whitespace-pre-line")}>{userInformation?.address}</p>
            </div>

            <div>
                <h4>Job</h4>
                <p className={cn("m-0")}>{userInformation?.job}</p>
            </div>

            <div>
                <h4>Identity Card/Passport</h4>
                {userInformation?.passports?.length ? (
                    <div className={cn("rounded-2xl", "min-h-[400px]", "bg-gray-100", "p-2")}>
                        <div className={cn("grid", "grid-cols-2", "sm:grid-cols-5", "gap-y-2")}>
                            {userInformation.passports.map((passport) => (
                                <FilePreview path={passport} key={passport} readonly />
                            ))}
                        </div>
                    </div>
                ) : (
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
                        <span
                            className={cn(
                                "text-gray-400",
                                "text-xs",
                                "text-center",
                                "block",
                                "mb-10"
                            )}
                        >
                            Your uploaded identity card/passport will be listed here
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
