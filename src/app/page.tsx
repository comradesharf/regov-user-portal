import cn from "#root/_libs/cn";
import Link from "next/link";

export default function Home() {
    return (
        <div className={cn("hero", "prose", "mx-auto", "h-[60vh]")}>
            <div className={cn("hero-content", "text-center")}>
                <div className={cn("max-w-6xl")}>
                    <h1 className={cn("text-6xl")}>Welcome to Pop Quiz solution</h1>

                    <Link href="/sign-in" className={cn("btn", "btn-primary")}>
                        Start Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
