import Loader from "#root/_components/Loader";
import cn from "#root/_libs/cn";

export type LoadingProps = {};

export default function Loading({}: LoadingProps) {
    return (
        <div className={cn("h-[60vh]", "flex", "items-center", "justify-center")}>
            <Loader />
        </div>
    );
}
