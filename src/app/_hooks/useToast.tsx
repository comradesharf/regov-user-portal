import cn from "#root/_libs/cn";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

export default function useToast() {
    const [toast, setToast] = useState<{ message: string; type: "error" | "info" } | undefined>(
        undefined
    );

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(undefined);
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, [toast]);

    return useDeferredValue(
        useMemo(() => {
            return {
                toast: toast ? (
                    <div className={cn("toast-center", "toast")}>
                        <div
                            className={cn("alert", {
                                "alert-error": toast.type === "error",
                                "alert-info": toast.type === "info",
                            })}
                        >
                            <span>{toast.message}</span>
                        </div>
                    </div>
                ) : null,
                showToast: setToast,
            };
        }, [toast])
    );
}
